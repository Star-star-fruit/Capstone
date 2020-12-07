import React from 'react'
import {connect} from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import {fetchDrafts, deleteSingleDraft} from '../store/drafts'
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button'

class Drafts extends React.Component {
  componentDidMount() {
    this.props.fetchAllDrafts()
  }

  render() {
    const drafts = this.props.drafts
    return (
      <div>
        <h3 />

        <Table aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell width="30%" align="center">
                Date
              </TableCell>
              <TableCell align="center">Content</TableCell>
              <TableCell> </TableCell>
              <TableCell> </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {drafts.map(draft => (
              <TableRow key={draft.id}>
                <TableCell>{draft.createdAt} </TableCell>
                <TableCell>
                  <div className="content">{draft.content} </div>
                </TableCell>
                <TableCell>
                  <Link to={`/drafts/${draft.id}`}>
                    <Button color="primary">Read</Button>
                  </Link>
                </TableCell>
                <TableCell>
                  <Button
                    color="secondary"
                    onClick={() => this.props.deleteDraft(draft.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

const mapState = state => {
  return {
    drafts: state.drafts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchAllDrafts: () => dispatch(fetchDrafts()),
    // fetchDraft: (draftId) => dispatch(fetchDraft(draftId)),
    deleteDraft: draftId => dispatch(deleteSingleDraft(draftId))
  }
}

export default connect(mapState, mapDispatch)(Drafts)
