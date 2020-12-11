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
import {postNewDraft} from '../store/drafts'
import {withRouter} from 'react-router-dom'
import throttle from 'lodash.throttle'
import Button from '@material-ui/core/Button'
import Popup from 'react-popup'
import SaveDraftAlert from './saveDraftAlert'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showScore: false
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.analyze = this.analyze.bind(this)
    this.saveContentThrottled = throttle(this.saveContent, 5000)
    this.clearAndSetNewDraft = this.clearAndSetNewDraft.bind(this)
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
      <div id="container">
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
        <div className="button-analyze">
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={this.analyze}
          >
            Analyze
          </Button>
        </div>
        <div className="button-save">
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={() => {
              this.saveContent(editorState.getCurrentContent())

              // this.props.isLoggedIn
              //   ?
              //   <SaveDraftAlert />
              //   : Popup.alert(
              //       'Your draft is currently saved only on this window. To access it anytime, please create an account.'
              //     )
              this.props.isLoggedIn
                ? Popup.alert(
                    'Draft saved! You can check it out in your account.'
                  )
                : Popup.alert(
                    'Your draft is currently saved only on this window. To access it anytime, please create an account.'
                  )
            }}
          >
            Save draft
          </Button>
        </div>
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
        <div className="text-analysis">
          {this.state.showScore
            ? `Analysis of your text:
                Your text obtained a score of ${Math.floor(
                  this.props.sentiment.score * 100
                ) / 1000} with ${this.props.words.length} minimizing words!`
            : undefined}
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
  fetchDraft: draftId => dispatch(fetchDraft(draftId))
})

TextEditor.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default withRouter(connect(mapState, mapDispatch)(TextEditor))
