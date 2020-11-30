import React, {Component} from 'react'
import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import Mark from 'mark.js'

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
    //let text = this.state.editorState.getCurrentContent().getPlainText('\u0001')
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
  }

  render() {
    return (
      <div className="text-editor">
        <Editor
          // className="text-editor"
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

export default TextEditor
