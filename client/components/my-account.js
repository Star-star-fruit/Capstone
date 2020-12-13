import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Drafts from './drafts'
import DataVisCloud from './data-vis-cloud'
import {connect} from 'react-redux'
import {fetchDrafts} from '../store/drafts'

class MyAccount extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchAllDrafts()
  }

  render() {
    const {user, drafts} = this.props
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h3>
              <div className="myaccount">
                {' '}
                Welcome back, {user.firstName} {user.lastName}!{' '}
              </div>
            </h3>
            <Paper width="100%">
              {drafts.length === 0 ? (
                <img src="/images/cloud3.png" className="wordCloud" />
              ) : (
                <DataVisCloud />
              )}
            </Paper>
            <br />
            <br />
            <Paper className="myaccount-text">
              <Drafts />
            </Paper>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  drafts: state.drafts
})

const mapDispatch = dispatch => {
  return {
    fetchAllDrafts: () => dispatch(fetchDrafts())
  }
}

export default connect(mapState, mapDispatch)(MyAccount)
