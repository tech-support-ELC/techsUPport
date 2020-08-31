import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div id="upperRight">
        <div className="navDropdown">
          <div className="navDropButton">My Info</div>
          <div className="navDropContent">
            <Link to="/medications">Medications</Link>
            <Link to="/doctors">Doctors</Link>
            <Link to="/conditions">Conditions</Link>
            <Link to="/documents">My Documents</Link>
          </div>
        </div>

        <Link to="/dailycheckin">Daily Checkin</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </nav>
  );
};

export default Navbar;
