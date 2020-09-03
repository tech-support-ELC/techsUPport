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
        <div className="MyMedicalInfo">
          <div className="navDropdown">
            <div className="navDropButton">Medical Info</div>
            <div className="navDropContent">
              <Link to="/medications">Medications</Link>
              <Link to="/doctors">Doctors</Link>
              <Link to="/conditions">Conditions</Link>
              <Link to="/documents">Documents</Link>
            </div>
          </div>
        </div>
        <div className='navDailyCheckin'>
          <Link to="/dailycheckin">Daily Checkin</Link>
        </div>
        <div className='navProfile'>
          <Link to="/profile">Profile</Link>
        </div>
        <div className='navLogout'>
          <Link to='#' onClick={handleClick}>Log out</Link>
        </div>
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
