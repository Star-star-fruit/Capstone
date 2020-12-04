import React from 'react'
//import {connect} from 'react-redux'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

class Drafts extends React.Component {
  // componentDidMount() {
  //   try {
  //   } catch {}
  // }

  render() {
    return (
      <div>
        <h3>Here are your drafts</h3>
        <Table size="medium">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="left">Content</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>hi</TableCell>
              {/* {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          </TableBody>
        </Table>
      </div>
    )
  }
}

// const mapState = state => {
//   return {}
// }

// const mapDispatch = dispatch => {
//   return {}
// }

export default Drafts
