import React from 'react'
import {connect} from 'react-redux'
import {fetchDraft, updateExistingDraft} from '../store/singleDraft'
import {withRouter} from 'react-router-dom'

class SingleDraft extends React.Component {
  constructor() {
    super()
    this.state = {
      content: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount() {
    this.props.fetchDraft(this.props.match.params.draftId)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  handleSubmit(event) {
    event.preventDefault()
    this.props.updateExistingDraft(this.props.content)
    this.setState({
      content: ''
    })
  }

  render() {
    return (
      <div>
        <h3>Edit your email here</h3>
        <p>{this.props.singleDraft.content} </p>
        <form
          id="single-draft-form"
          className="single-draft"
          onSubmit={this.handleSubmit}
        >
          <label htmlFor="draftcontent">Update your text here</label>
          <input
            type="text"
            name="content"
            value={this.state.content}
            onChange={this.handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleDraft: state.singleDraft
  }
}

const mapDispatch = dispatch => {
  return {
    fetchDraft: draftId => dispatch(fetchDraft(draftId)),
    updateExistingDraft: draft => dispatch(updateExistingDraft(draft))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleDraft))
