import React from 'react'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Drafts from './drafts'
import DataVisCloud from './data-vis-cloud'
import {connect} from 'react-redux'

import {fetchWordData} from '../store/wordData'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'

class MyAccount extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.fetchWordData()
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
            <Box boxShadow={3}>
              <Paper width="100%">
                {this.props.wordData.length === 0 ? (
                  <img src="/images/cloud3.png" className="wordCloud" />
                ) : (
                  <DataVisCloud />
                )}
              </Paper>

              <Paper width="50%" className="datavis" text-align="center">
                {this.props.wordData.length === 0 ? (
                  <Typography variant="subtitle2">
                    <div text-align="center">
                      {' '}
                      <strong>
                        Start analyzing and saving some drafts to see a visual
                        representation of your frequently used minimizing words!
                      </strong>
                    </div>
                  </Typography>
                ) : (
                  <Typography variant="subtitle2" text-align="center">
                    <div text-align="center" />{' '}
                    <strong>
                      This is a data wordcloud of your frequently used
                      minimizing words. Click the words for more information.{' '}
                    </strong>
                  </Typography>
                )}
              </Paper>
            </Box>
            <br />
            <br />
            <Box boxShadow={3}>
              <Paper className="myaccount-text">
                <Drafts />
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  user: state.user,
  wordData: state.wordData
})

const mapDispatch = dispatch => {
  return {
    fetchWordData: () => dispatch(fetchWordData())
  }
}

export default connect(mapState, mapDispatch)(MyAccount)
