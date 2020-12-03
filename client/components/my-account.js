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
            <Paper>
              <img
                className="wordCloud"
                src="https://ak.picdn.net/shutterstock/videos/34708162/thumb/10.jpg"
              />
            </Paper>

            <Paper>
              <Drafts />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

export default MyAccount
