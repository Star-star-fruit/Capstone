import React, {Component} from 'react'
import {connect} from 'react-redux'
import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Mark from 'mark.js'
import {createSentimentAnalysis} from '../store/sentiment'
import {createMinimizingWords} from '../store/words'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
    this.analyze = this.analyze.bind(this)
  }

  onEditorStateChange(editorState) {
    this.setState({editorState})
  }

  async analyze() {
    let text = this.state.editorState.getCurrentContent().getPlainText('\u0001')

    await this.props.createSentimentAnalysis(text)
    await this.props.createMinimizingWords(text)

    let terms = this.props.words.map(element => element.word)

    let instance = new Mark(document.querySelector('.text-editor'))
    const options = {
      accuracy: {
        value: 'exactly',
        limiters: [',', '.']
      },
      separateWordSearch: false
    }
    instance.mark(terms, options)

    //console.log('WORDS ', this.props.words)
  }

  render() {
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
        <button onClick={this.analyze}>Analyze</button> <br /> <br />
        <button>Save draft</button>
      </div>
    )
  }
}

const mapState = state => ({
  sentiment: state.sentiment,
  words: state.words
})

const mapDispatch = dispatch => ({
  createSentimentAnalysis: text => dispatch(createSentimentAnalysis(text)),
  createMinimizingWords: text => dispatch(createMinimizingWords(text))
})

export default connect(mapState, mapDispatch)(TextEditor)
