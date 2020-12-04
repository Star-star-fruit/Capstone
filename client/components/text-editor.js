import React, {Component} from 'react'
import {connect} from 'react-redux'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Mark from 'mark.js'
import {createSentimentAnalysis} from '../store/sentiment'
import {createMinimizingWords} from '../store/words'
import PropTypes from 'prop-types'
import {updateExistingDraft, fetchDraft} from '../store/singleDraft'
import {postNewDraft} from '../store/drafts'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.analyze = this.analyze.bind(this)
  }

  saveContent = contentState => {
    const currentContent = contentState.getPlainText('\u0001')

    if (this.props.isLoggedIn && !this.props.draft.id) {
      this.props.postNewDraft({content: currentContent})
    } else if (this.props.isLoggedIn && this.props.draft.id) {
      this.props.updateExistingDraft({
        content: currentContent,
        id: this.props.draft.id
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
    this.saveContent(contentState) //---> //NEED TO IMPLEMENT LODASH/DEBOUNCING TO PREVENT SAVING WITH EVERY KEYSTROKE
    this.setState({editorState})
  }

  componentDidMount() {
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
    } else if (this.props.isLoggedIn && this.props.draft.id) {
      this.props.fetchDraft(this.props.match.params.id)
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

    await this.props.createSentimentAnalysis(text)
    await this.props.createMinimizingWords(text)

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
  }

  render() {
    // if (!this.state.editorState) {
    //   return <h3 className="loading">Loading...</h3>
    // }
    console.log('This is PROPS -->', this.props)

    // const {isLoggedIn, draft} = this.props
    const editorState = this.state.editorState

    return (
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
        <button type="button" onClick={this.analyze}>
          Analyze
        </button>
        <br /> <br />
        <button
          type="button"
          onClick={() => {
            this.saveContent(editorState.getCurrentContent())
          }}
        >
          Save draft
        </button>
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
  updateExistingDraft: draft => dispatch(updateExistingDraft(draft))
})

TextEditor.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}

export default connect(mapState, mapDispatch)(TextEditor)
