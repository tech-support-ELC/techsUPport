import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/auth'


const Home = (props) => {
  const { firstName } = props.currentUser
  const { handleClick } = props
  return (
    <div>
      <h1>Welcome {firstName}!</h1>
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
