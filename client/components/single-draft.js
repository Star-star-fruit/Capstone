import React from 'react'
import {connect} from 'react-redux'
import {fetchDraft} from '../store/singleDraft'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class SingleDraft extends React.Component {
  componentDidMount() {
    this.props.fetchDraft(this.props.match.params.draftId)
  }

  render() {
    return (
      <div>
        <p>{this.props.singleDraft.content} </p>
        <Link to={`/texteditor/${this.props.singleDraft.id}`}>
          <Button color="secondary">Update</Button>
        </Link>
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
    fetchDraft: draftId => dispatch(fetchDraft(draftId))
  }
}

export default withRouter(connect(mapState, mapDispatch)(SingleDraft))
