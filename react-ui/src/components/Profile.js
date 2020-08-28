import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/auth'
import UploadDocuments from './UploadDocuments'
import Documents from './Documents'

const Home = (props) => {
  const { id, firstName, lastName, email } = props.currentUser
  const { handleClick } = props
  return (
    <div>
      <h1>User Profile</h1>
      <h4>Name: {firstName} {lastName}</h4>
      <h4>Email: {email}</h4>
      <span><Documents {...props} /></span>
      <div>
        Upload your insurance card and ID card:
      </div>
      <span><UploadDocuments userid={id} /></span>
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
