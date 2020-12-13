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
      <div className="singleDraft-content">
        <br />
        <br />
        <br />
        <br />
        <table className="singleDraft-table">
          <thead>
            <tr>
              <td />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.singleDraft.content}</td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <Link to={`/texteditor/${this.props.singleDraft.id}`}>
          <div className="update-button">
            <Button color="secondary" className="update-button">
              Update
            </Button>
          </div>
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
