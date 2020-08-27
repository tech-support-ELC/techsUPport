import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../redux/auth'


const Home = (props) => {
  console.log("home page")
  const { firstName } = props.currentUser
  const { handleClick } = props
  return (
    <div>
      <h1>Welcome {firstName}!</h1>
      <h2>Onboarding</h2>
      <Link to="/doctors">Click to follow our onboarding</Link>
      <p>
        <button type='submit' onClick={handleClick}>Log out</button>
      </p>
    </div >
  )
}
const mapState = ({ currentUser }) => ({ currentUser })

const mapDispatch = (dispatch, ownProps) => ({
  handleClick: () => {
    dispatch(logout(ownProps.history))
  }
})

export default connect(mapState, mapDispatch)(Home)
