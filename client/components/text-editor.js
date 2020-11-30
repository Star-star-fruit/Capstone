import React, {Component} from 'react'
import {connect} from 'react-redux'
import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Mark from 'mark.js'
import {getSentimentAnalysis} from '../store/sentiment'
import {getMinimizingWords} from '../store/words'

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

  analyze() {
    let text = this.state.editorState.getCurrentContent().getPlainText('\u0001')
    let term = [
      'sorry',
      'expert',
      'apologize',
      'believe',
      'just',
      'feel',
      'possibly',
      'kind of',
      'likely',
      'make sense'
    ]
    let instance = new Mark(document.querySelector('.text-editor'))
    instance.mark(term)

    this.props.getSentimentAnalysis(text)
    this.props.getMinimizingWords(text)

    //logging WORDS too soon, must await for getSentiment & getWords to finish !! hooks?
    //.then(console.log('THIS IS PROPS AFTER DISPATCH--> ', this.props))
    //.then(console.log('WORDS ',this.props.words))
    //.then(console.log('SENTIMENT ',this.props.sentiment))
  }

  render() {
    return (
      <div className="text-editor">
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbar-class"
          wrapperClassName="wrapper-class"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
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
  getSentimentAnalysis: text => dispatch(getSentimentAnalysis(text)),
  getMinimizingWords: text => dispatch(getMinimizingWords(text))
})

export default connect(mapState, mapDispatch)(TextEditor)
