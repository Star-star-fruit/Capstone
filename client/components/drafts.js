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
import {Paper} from '@material-ui/core'

class Drafts extends React.Component {
  componentDidMount() {
    this.props.fetchAllDrafts()
  }

  render() {
    const drafts = this.props.drafts
    return (
      <React.Fragment>
        {drafts.length === 0 ? (
          <>You have no drafts yet! Save some in the text editor. </>
        ) : (
          <Table aria-label="a dense table" className="myaccount-table">
            <TableHead>
              <TableRow>
                <TableCell align="center">
                  <div className="date-content">Date</div>
                </TableCell>
                <TableCell align="center">Content</TableCell>
                <TableCell> </TableCell>
                <TableCell> </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drafts.map(draft => (
                <TableRow key={draft.id}>
                  <TableCell>
                    <div className="datecontent">{draft.createdAt}</div>
                  </TableCell>
                  <TableCell>
                    <div className="content">{draft.content}</div>
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
        )}
      </React.Fragment>
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
    deleteDraft: draftId => dispatch(deleteSingleDraft(draftId))
  }
}

export default connect(mapState, mapDispatch)(Drafts)
