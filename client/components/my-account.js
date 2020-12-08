import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Drafts from './drafts'

class MyAccount extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>
              <div className="myaccount"> Welcome back! </div>
            </h3>
            <Paper>
              <img className="wordCloud" src="/images/cloud3.png" />
            </Paper>
            <Paper className="myaccount-text">
              <Drafts />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MyAccount
