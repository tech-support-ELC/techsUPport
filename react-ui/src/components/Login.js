import React from 'react'
import { connect } from 'react-redux'
import { login } from '../redux/auth'
import { API_URL } from '../redux/API_URL';
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

const Login = (props) => {
  console.log('Login')
  const { handleSubmit } = props
  console.log('login page')
  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type='submit'>Log in</button>
      </form>
      <div>
        <span>OR</span>
      </div>
      <p>
        <a
          target='_self'
          href={`${API_URL}/auth/google`}
        >
          <i />
          <span>Log in with Google</span>
        </a>
        <a
          target='_self'
          href={`${API_URL}/auth/facebook`}
        >
          <i />
          <span>Log in with Facebook</span>
        </a>
      </p>


      <p>
        <Link to='/signup'>
          Sign up here
        </Link>
      </p>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapDispatch = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const credentials = { email, password }
    dispatch(login(credentials, ownProps.history))
  }
})

export default connect(null, mapDispatch)(Login)

