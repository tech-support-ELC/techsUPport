import React from 'react'
import { connect } from 'react-redux'
import { login, signup } from '../redux/auth'

/* -----------------    COMPONENT     ------------------ */

const Auth = (props) => {
  const { message, handleSubmit } = props
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>email</label>
        <input
          name='email'
          type='email'
          required
        />
        <label>password</label>
        <input
          name='password'
          type='password'
          required
        />
        <button type='submit'>{message}</button>
      </form>

      <div>
        <span>OR</span>
      </div>

      <div>
        <p>
          <a
            target='_self'
            href='/auth/google'
          >
            <i />
            <span>{message} with Google</span>
          </a>
        </p>
      </div>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapStateLogin = () => ({ message: 'Log in' })
const mapDispatchLogin = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const credentials = { email, password }
    dispatch(login(credentials, ownProps.history))
  }
})

const mapStateSignup = () => ({ message: 'Sign up' })
const mapDispatchSignup = (dispatch, ownProps) => ({
  handleSubmit: event => {
    event.preventDefault()
    const email = event.target.email.value
    const password = event.target.password.value
    const credentials = { email, password }
    dispatch(signup(credentials, ownProps.history))
  }
})

export const Login = connect(mapStateLogin, mapDispatchLogin)(Auth)
export const Signup = connect(mapStateSignup, mapDispatchSignup)(Auth)
