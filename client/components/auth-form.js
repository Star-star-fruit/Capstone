import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

/**
 * COMPONENT
 */

// https://images.squarespace-cdn.com/content/v1/51a66d74e4b0d431ae259a9d/1553632747069-0HUMB6E5LG1H46XXNSDC/ke17ZwdGBToddI8pDm48kCrYIuMNMm1GI3vh_7TAIMBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxdri0fPt4wZqcOMTA9H0sn0N0_BMVwYHKKk3Q664sNbnq1ZlorBX2rpVU0RQ6Zarg/image-asset.jpeg?format=1500w
//https://images.squarespace-cdn.com/content/v1/51a66d74e4b0d431ae259a9d/1553632747069-0HUMB6E5LG1H46XXNSDC/ke17ZwdGBToddI8pDm48kCrYIuMNMm1GI3vh_7TAIMBZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZUJFbgE-7XRK3dMEBRBhUpxdri0fPt4wZqcOMTA9H0sn0N0_BMVwYHKKk3Q664sNbnq1ZlorBX2rpVU0RQ6Zarg/image-asset.jpeg?format=1500w
//https://image.freepik.com/free-vector/young-women-with-landscape_25030-43713.jpg
const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh'
  },
  image: {
    backgroundImage:
      'url(https://images.creativemarket.com/0.1.0/ps/7781623/3005/2001/m1/fpnw/wm0/sisterhood-05-.jpg?1582030921&s=bff106afd5a58c8c0d814c4c0d415dda)',
    backgroundColor:
      theme.palette.type === 'light'
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '70%',
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}))
const AuthForm = props => {
  const classes = useStyles()
  const {name, displayName, handleSubmit, error} = props

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar} />
          <Typography component="h1" variant="h5">
            Log In
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} name={name}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {displayName}
            </Button>
          </form>
          <a href="/auth/google">{displayName} with Google</a>
          <br />
          <Grid container justify="center">
            <Link href="/signup" variant="body1">
              {"Don't have an account? Sign Up here!"}
            </Link>
          </Grid>

          <br />
          <Grid container>
            <Grid item xs />
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
