import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'

import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Link from '@material-ui/core/Link'
import Paper from '@material-ui/core/Paper'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
//import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'

/**
 * COMPONENT
 */
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Like a Boss
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    height: '90vh'
  },
  image: {
    backgroundImage:
      'url(https://i.pinimg.com/originals/16/20/ad/1620ad2a70a1f72e30ab4f36c96c0bc8.jpg)',
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

const SignUp = props => {
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
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} name={name}>
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              id="firstName"
              name="firstName"
              label="First Name"
              type="firstname"
              autoFocus
            />
            <TextField
              variant="standard"
              margin="normal"
              required
              fullWidth
              name="lastName"
              label="Last Name"
              type="lastname"
              id="lastname"
              autoComplete="lastname"
            />
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
          <Grid container>
            <Grid item xs>
              {' '}
              <Copyright />
            </Grid>
          </Grid>
        </div>
      </Grid>
    </Grid>
  )
}
//   const {name, displayName, handleSubmit, error} = props

//   return (
//     <div>
//       <form onSubmit={handleSubmit} name={name} noValidate autoComplete="off">
//         <div>
//           <Input
//             id="standard-basic"
//             label="First Name"
//             name="firstName"
//             margin="normal"
//             required
//             fullWidth
//             autoFocus
//           />
//         </div>
//         <div>
//           <Input
//             id="standard-basic"
//             name="lastName"
//             label="Last Name"
//             margin="normal"
//             required
//             fullWidth
//             autoFocus
//           />
//         </div>
//         <div>
//           <Input
//             id="standard-basic"
//             margin="normal"
//             required
//             fullWidth
//             label="Email Address"
//             name="email"
//             type="email"
//             required
//             autoFocus
//           />
//         </div>
//         <div>
//           <Input
//             id="standard-basic"
//             margin="normal"
//             label="Password"
//             name="password"
//             type="password"
//             required
//           />
//         </div>
//         <div>
//           <button>{displayName}</button>
//         </div>
//         {error && error.response && <div> {error.response.data} </div>}
//         <br />
//         <a href="/auth/google" className="btn btn-success">
//           {displayName} with Google
//         </a>
//       </form>
//     </div>
//   )
// }

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      console.log(evt.target.firstName, 'FIRST NAME')
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(signup(firstName, lastName, email, password))
    }
  }
}

export const Signup = connect(mapSignup, mapDispatch)(SignUp)

/**
 * PROP TYPES
 */
SignUp.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
