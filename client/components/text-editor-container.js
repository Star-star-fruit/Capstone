import React, {Component} from 'react'
import {connect} from 'react-redux'
import TextEditor from './text-editor'

class TextEditorContainer extends Component {
  render() {
    if (this.props.user.loading) {
      return <></>
    }

    return (
      <div>
        <TextEditor />
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user
})

export default connect(mapState, null)(TextEditorContainer)
