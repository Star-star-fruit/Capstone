import React, {Component} from 'react'
import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

class TextEditor extends Component {
  constructor(props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty()
    }
    this.onEditorStateChange = this.onEditorStateChange.bind(this)
  }

  onEditorStateChange(editorState) {
    this.setState({editorState})
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          toolbarClassName="toolbarClassName"
          // wrapperClassName="wrapperClassName"
          wrapperClassName="wrapper-class"
          editorClassName="editorClassName"
          onEditorStateChange={this.onEditorStateChange}
        />
        <button>Analyze</button>
      </div>
    )
  }
}

export default TextEditor
