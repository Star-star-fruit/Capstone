import React, {Component} from 'react'
import {connect} from 'react-redux'
import {EditorState, convertToRaw, convertFromRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Mark from 'mark.js'
import {createSentimentAnalysis} from '../store/sentiment'
import {createMinimizingWords} from '../store/words'
import PropTypes from 'prop-types'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    const content = window.localStorage.getItem('content')
    if (content) {
      this.state.editorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(content))
      )
    } else {
      this.state.editorState = EditorState.createEmpty()
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.analyze = this.analyze.bind(this)
  }

  saveContent = content => {
    window.localStorage.setItem(
      'content',
      JSON.stringify(convertToRaw(content))
    )
  }

  onEditorStateChange(editorState) {
    const contentState = editorState.getCurrentContent()
    // if (isLoggedIn) {

    // } else {
    this.saveContent(contentState)
    // }
    this.setState({editorState})
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
    const {isLoggedIn} = this.props
    // toolbar={
    //   {inline: {subscript: undefined}}
    // }
    return (
      <div className="text-editor-parent">
        <div className="text-editor">
          <Editor
            editorState={this.state.editorState}
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
        <button type="button">Save draft</button>
      </div>
    )
  }
}

const mapState = state => ({
  sentiment: state.sentiment,
  words: state.words,
  isLoggedIn: !!state.user.id
})

const mapDispatch = dispatch => ({
  createSentimentAnalysis: text => dispatch(createSentimentAnalysis(text)),
  createMinimizingWords: text => dispatch(createMinimizingWords(text))
})

export default connect(mapState, mapDispatch)(TextEditor)

TextEditor.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
}
