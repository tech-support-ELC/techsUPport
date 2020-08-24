import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'


const Home = (props) => {
  const { firstName } = props.currentUser
  return (
    <div>
      <h1>Welcome {firstName}!</h1>
      <h2>Onboarding</h2>
      <Link to="/doctors">Click to follow our onboarding</Link>
    </div>
  )
}
const mapState = ({ currentUser }) => ({ currentUser })

export default connect(mapState)(Home)
