import React from 'react'
import {TextEditor} from 'text-editor.js'
import {connect} from 'react-redux'
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw
} from 'draft-js'

class DraftEditorRaw extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorState: EditorState.createEmpty()}
    this.onChange = editorState => {
      // Convert to raw js object
      const raw = convertToRaw(editorState.getCurrentContent())
      // Save raw js object to local storage
      this.saveEditorContent(raw)
      this.setState({editorState})
    }
  }

  componentDidMount() {
    // Load editor data (raw js object) from local storage
    const rawEditorData = this.getSavedEditorData()
    if (rawEditorData !== null) {
      const contentState = convertFromRaw(rawEditorData)
      this.setState({
        editorState: EditorState.createWithContent(contentState)
      })
    }
  }

  saveEditorContent(data) {
    localStorage.setItem('editorData', JSON.stringify(data))
  }

  getSavedEditorData() {
    const savedData = localStorage.getItem('editorData')
    return savedData ? JSON.parse(savedData) : null
  }

  handleKeyCommand(command) {
    const {editorState} = this.state
    const newState = RichUtils.handleKeyCommand(editorState, command)
    if (newState) {
      this.onChange(newState)
      return true
    }
    return false
  }

  renderContentAsRawJs() {
    const contentState = this.state.editorState.getCurrentContent()
    const raw = convertToRaw(contentState)
    return JSON.stringify(raw, null, 2)
  }

  render() {
    return (
      <div>
        <h4>Draft js editor</h4>
        <div className="editor-container">
          <Editor
            handleKeyCommand={this.handleKeyCommand.bind(this)}
            editorState={this.state.editorState}
            onChange={this.onChange}
          />
        </div>
        <h4>Editor content as raw JS</h4>
        <pre>{this.renderContentAsRawJs()}</pre>
      </div>
    )
  }
}

export default connect(null, null)(DraftEditorRaw)
