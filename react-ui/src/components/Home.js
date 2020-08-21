import React from 'react'
import { connect } from 'react-redux'

const Home = () => {
  const { firstName } = this.props.currentUser
  return (
    <div>
      <h1>Welcome {firstName}!</h1>
    </div>
  )
}
const mapState = ({ currentUser }) => ({ currentUser })

export default connect(mapState)(Home)
