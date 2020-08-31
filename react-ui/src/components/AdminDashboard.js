import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUsersThunk, deleteUserThunk } from '../redux/users';

class AdminDashboard extends Component {
  componentDidMount() {
    this.props.getUsers();
  }
  render() {
    const users = this.props.users;
    console.log(this.props)
    return (
      <div>
        <h2>Admin Dashboard</h2>
        <h3>All users</h3>
            {users && users.map((user) => {
              return (
                <div key={user.id}>
                  <div>{user.firstName} {user.lastName}</div>
                   <button
                    type="submit"
                    onClick={() => this.props.deleteUser(user.id)}
                    >
                      Delete User
                    </button>
                </div>
              )
            })}
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    users: state.users
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUsers: () => dispatch(getUsersThunk()),
    deleteUser: (id) => dispatch(deleteUserThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminDashboard)
