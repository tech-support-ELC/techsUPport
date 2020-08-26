import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/medications">My Medications</Link>
        <Link to="/doctors">My Doctors</Link>
        <Link to="/conditions">My Conditions</Link>
        <Link to="/uploadDoc">Add Documents</Link>
      </div>
    </div>
  );
};

export default Navbar;
