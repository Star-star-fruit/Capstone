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

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showScore: false
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.analyze = this.analyze.bind(this)
    this.saveContentThrottled = throttle(this.saveContent, 5000)
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
        console.error('There was a problem fetching a draft: ', error)
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
      await this.props.createSentimentAnalysis(text)
    } catch (error) {
      console.error('Error occured while creating sentiment analysis')
    }

    try {
      await this.props.createMinimizingWords(text)
    } catch (error) {
      console.error('Error occured while creating minimizing words')
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
    if (!this.props.match.params.id && this.props.draft.id) {
      this.props.history.push(`/texteditor/${this.props.draft.id}`)
    }
    // if (!this.state.editorState) {
    //   return <h3 className="loading">Loading...</h3>
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
            />
          </div>
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={this.analyze}
          >
            Analyze
          </Button>
          <br /> <br />
          <Button
            color="primary"
            variant="contained"
            type="button"
            onClick={() => {
              this.saveContent(editorState.getCurrentContent())
              this.props.isLoggedIn
                ? window.alert('Draft saved!')
                : window.alert(
                    'Your draft is saved in the editor. You must log in to archive your draft!'
                  )
            }}
          >
            Save draft
          </Button>
          <div>
            {this.state.showScore
              ? `Your text obtained a score of ${Math.floor(
                  this.props.sentiment.score * 100
                ) / 100} with ${this.props.words.length} minimizing words!`
              : undefined}
          </div>
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
  createSentimentAnalysis: text => dispatch(createSentimentAnalysis(text)),
  createMinimizingWords: text => dispatch(createMinimizingWords(text)),
  postNewDraft: draft => dispatch(postNewDraft(draft)),
  updateExistingDraft: draft => dispatch(updateExistingDraft(draft)),
  fetchDraft: draftId => dispatch(fetchDraft(draftId))
})

TextEditor.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default withRouter(connect(mapState, mapDispatch)(TextEditor))
