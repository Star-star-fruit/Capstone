import React, {Component} from 'react'
import {connect} from 'react-redux'
import {EditorState, convertToRaw, convertFromRaw, ContentState} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Mark from 'mark.js'
import {createSentimentAnalysis} from '../store/sentiment'
import {createMinimizingWords} from '../store/words'
import PropTypes from 'prop-types'
import {updateExistingDraft, fetchDraft} from '../store/singleDraft'
import {postNewDraft, sendNewEmail} from '../store/drafts'
import {withRouter} from 'react-router-dom'
import throttle from 'lodash.throttle'
import Button from '@material-ui/core/Button'
import Link from '@material-ui/core/Link'
import ControlledPopup from './Popup'
import ControlledPopup2 from './popup-email'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showScore: false,
      to: '',
      subject: '',
      emailSent: false
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.analyze = this.analyze.bind(this)
    this.saveContentThrottled = throttle(this.saveContent, 5000)
    this.clearAndSetNewDraft = this.clearAndSetNewDraft.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  saveContent = contentState => {
    const currentContent = contentState.getPlainText('\u0001')

    if (this.props.isLoggedIn && !this.props.match.params.id) {
      this.props.postNewDraft({content: currentContent})
    } else if (this.props.isLoggedIn && this.props.match.params.id) {
      this.props.updateExistingDraft({
        content: currentContent,
        id: this.props.match.params.id
      })
    } else {
      window.localStorage.setItem(
        'content',
        JSON.stringify(convertToRaw(contentState))
      )
    }
  }

  onEditorStateChange(editorState) {
    const contentState = editorState.getCurrentContent()
    this.saveContentThrottled(contentState)
    this.setState({editorState})
  }

  clearAndSetNewDraft() {
    const editorState = this.state.editorState
    this.saveContent(editorState.getCurrentContent())
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const {to, subject} = this.state
    this.props.sendNewEmail(this.props.draft.content, to, subject)
    this.setState({
      to: '',
      subject: '',
      emailSent: true
    })
  }

  async componentDidMount() {
    if (!this.props.isLoggedIn) {
      const content = window.localStorage.getItem('content')
      if (content) {
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(JSON.parse(content))
          )
        })
      } else {
        this.setState({
          editorState: EditorState.createEmpty()
        })
      }
    } else if (this.props.isLoggedIn && this.props.match.params.id) {
      try {
        const action = await this.props.fetchDraft(this.props.match.params.id)
        this.setState({
          editorState: EditorState.createWithContent(
            ContentState.createFromText(action.draft.content)
          )
        })
      } catch (error) {
        console.error('There was a problem fetching this draft: ', error)
      }
    } else {
      this.setState({
        editorState: EditorState.createEmpty()
      })
    }
  }

  async analyze() {
    const text = this.state.editorState
      .getCurrentContent()
      .getPlainText('\u0001')

    try {
      await this.props.createSentimentAnalysis(text, this.props.draft.id)
    } catch (error) {
      console.error('There was an error trying to analyze this text!')
    }

    try {
      await this.props.createMinimizingWords(text, this.props.draft.id)
    } catch (error) {
      console.error(
        'There was an error trying to identify the minimizing words!'
      )
    }

    const terms = this.props.words.map(element => element.word)
    const instance = new Mark(document.querySelector('.text-editor'))
    const options = {
      accuracy: {
        value: 'exactly',
        limiters: [',', '.']
      },
      separateWordSearch: false
    }
    instance.mark(terms, options)
    this.setState({
      showScore: true
    })
  }

  render() {
    if (this.props.draft.id && !this.props.match.params.id) {
      this.props.history.push(`/texteditor/${this.props.draft.id}`)
    }

    // if (this.props.draft.id && this.props.match.params.id !== this.props.draft.id) {
    //   this.props.history.push(`/texteditor/${this.props.draft.id}`)
    // }
    const editorState = this.state.editorState

    return (
      <div id="form">
        <div className="form2">
          <div className="button-new-draft">
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={this.clearAndSetNewDraft}
            >
              New Draft
            </Button>
          </div>
          <form id="email-form" onSubmit={this.handleSubmit}>
            <label htmlFor="email-to">
              <strong>To:</strong>
            </label>
            <input
              required
              className="email-to"
              name="to"
              type="email"
              value={this.state.to}
              onChange={this.handleChange}
            />
            <br />
            <label htmlFor="email-subject">
              <strong>Subject:</strong>{' '}
            </label>
            <input
              className="email-subject"
              name="subject"
              type="text"
              value={this.state.subject}
              onChange={this.handleChange}
              required
            />
          </form>
        </div>
        <br />
        <div className="text-editor-parent">
          <div className="text-editor">
            <Editor
              editorState={editorState}
              toolbarClassName="toolbar-class"
              wrapperClassName="wrapper-class"
              editorClassName="editorClassName"
              onEditorStateChange={this.onEditorStateChange}
              toolbar={{
                inline: {inDropdown: true},
                history: {inDropdown: true}
              }}
            />
          </div>
        </div>
        <div className="buttons">
          <div className="button-analyze">
            <Button
              color="secondary"
              variant="contained"
              type="button"
              onClick={this.analyze}
            >
              Analyze
            </Button>{' '}
            <span />
            <ControlledPopup
              isLoggedIn={this.props.isLoggedIn}
              trigger={
                <Button
                  onClick={() => {
                    this.saveContent(editorState.getCurrentContent())
                  }}
                />
              }
            />
          </div>
          <div className="button-save" />
        </div>
        <div className="button-send">
          <Link to="/drafts">
            <Button
              color="primary"
              variant="contained"
              type="button"
              onClick={this.handleSubmit}
            >
              Send Mail
            </Button>
          </Link>
          {/* {this.emailSent ? (
            <ControlledPopup2
              isLoggedIn={this.props.isLoggedIn}
              trigger={<Button onClick={this.handleSubmit} />}
            />
          ) : undefined} */}
        </div>
        <div className="text-analysis">
          {this.state.showScore ? (
            <table className="analysis-table">
              <thead>
                <tr>
                  <td>
                    <strong> This is the analysis of your text</strong>
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Your text obtained a score of{' '}
                    {Math.floor(this.props.sentiment.score * 100) / 1000} with{' '}
                    {this.props.words.length} minimizing words!
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            undefined
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  sentiment: state.sentiment,
  words: state.words,
  isLoggedIn: !!state.user.id,
  draft: state.singleDraft
})

const mapDispatch = dispatch => ({
  createSentimentAnalysis: (text, draftId) =>
    dispatch(createSentimentAnalysis(text, draftId)),
  createMinimizingWords: (text, draftId) =>
    dispatch(createMinimizingWords(text, draftId)),
  postNewDraft: draft => dispatch(postNewDraft(draft)),
  updateExistingDraft: draft => dispatch(updateExistingDraft(draft)),
  fetchDraft: draftId => dispatch(fetchDraft(draftId)),
  sendNewEmail: (text, to, subject) => dispatch(sendNewEmail(text, to, subject))
})

TextEditor.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default withRouter(connect(mapState, mapDispatch)(TextEditor))
