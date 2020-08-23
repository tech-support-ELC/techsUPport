import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

const Signup = (props) => {
  const { handleSubmit } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          name='firstName'
          type='text'
          placeholder='First Name'
          required
        />
        <p>
          <label>Last Name</label>
          <input
            name='lastName'
            type='text'
            placeholder='Last Name'
            required
          />
        </p>
        <label>Email</label>
        <input
          name='email'
          type='email'
          required
        />
        <p>
          <label>Password</label>
          <input
            name='password'
            type='password'
            required
          />
        </p>
        <button type='submit'>Sign up</button>
      </form>
      <div>
        <span>OR</span>
      </div>
      <p>
        <a
          target='_self'
          href='/auth/google'
        >
          <i />
          <span>Sign up with Google</span>
        </a>
      </p>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()
    const firstName = event.target.firstName.value
    const lastName = event.target.lastName.value
    const email = event.target.email.value
    const password = event.target.password.value
    const credentials = { firstName, lastName, email, password }
    dispatch(signup(credentials, ownProps.history))
  }
})

export default connect(null, mapDispatch)(Signup)
