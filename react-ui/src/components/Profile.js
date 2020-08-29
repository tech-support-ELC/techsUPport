import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/auth'
import UploadDocuments from './UploadDocuments'
import ProofOfIdentity from './ProofOfIdentity'
import { getAllConditionsThunk } from '../redux/conditions'
import { getAllDoctorsThunk } from '../redux/doctors'

class Profile extends Component {
  componentDidMount() {
    this.props.loadUserInfo()
  }

  render() {
    const { firstName, lastName, email } = this.props.currentUser
    const { handleClick } = this.props
    return (
      <div>
        <h1>User Profile</h1>
        <h4>Name: {firstName} {lastName}</h4>
        <h4>Email: {email}</h4>
        <div>
          Your insurance card and ID card:
      </div>
        <span><ProofOfIdentity {...this.props} /></span>
        <span><UploadDocuments /></span>
        <p>
          <button type='submit' onClick={handleClick}>Log out</button>
        </p>
      </div >
    )
  }
}

const mapState = ({ currentUser }) => ({ currentUser })

const mapDispatch = (dispatch, ownProps) => ({
  handleClick: () => {
    dispatch(logout(ownProps.history))
  },
  loadUserInfo: () => {
    dispatch(getAllConditionsThunk())
    dispatch(getAllDoctorsThunk())
  }
})


export default connect(mapState, mapDispatch)(Profile)
