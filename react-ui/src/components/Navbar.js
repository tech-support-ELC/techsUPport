import React from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'
import { logout } from '../redux/auth'
import history from '../utils/history'

const Navbar = (props) => {
  const { handleClick } = props

  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div id="upperRight">
        <div className="navDropdown">
          <div className="navDropButton">Medical Info</div>
          <div className="navDropContent">
            <Link to="/medications">Medications</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/conditions">Conditions</Link>
            <Link to="/documents">Documents</Link>
          </div>
        </div>

        <Link to="/dailycheckin">Daily Checkin</Link>
        <Link to="/profile">Profile</Link>
        <Link to='#' onClick={handleClick}>Log out</Link>
      </div>
    </nav>
  );
};

const mapDispatch = (dispatch) => ({
  handleClick: () => {
    dispatch(logout(history))
  }
})
export default connect(null, mapDispatch)(Navbar);
