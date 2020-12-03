import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {signup} from '../store'

/**
 * COMPONENT
 */
const SignUp = props => {
  const {name, displayName, handleSubmit, error} = props
  console.log(props, 'the props')

  return (
    <div>
      <form onSubmit={handleSubmit} name={name}>
        <div>
          <label htmlFor="firstName">
            <small>First Name</small>
          </label>
          <input className="form-control" name="firstName" required />
        </div>

        <div>
          <label htmlFor="lastName">
            <small>Last Name</small>
          </label>
          <input className="form-control" name="lastName" required />
        </div>

        <div>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input className="form-control" name="email" type="email" required />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input
            className="form-control"
            name="password"
            type="password"
            required
          />
        </div>
        <div>
          <button type="button">{displayName}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
        <br />
        <a href="/auth/google" className="btn btn-success">
          {displayName} with Google
        </a>
      </form>
    </div>
  )
}

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
