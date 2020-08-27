import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div id="upperRight">
        <Link to="/medications">My Medications</Link>
        <Link to="/doctors">My Doctors</Link>
        <Link to="/conditions">My Conditions</Link>
        <Link to="/documents">My Documents</Link>
      </div>
    </nav>
  );
};

export default Navbar;
