import React from "react";
import Onboarding from "../Onboarding";
import HomeAddButtons from "../HomeAddButtons";
import { Link } from "react-router-dom";
import moment from "moment";
import home from "../../images/home.png";
import checkDay from "../../utils/onboarding-date-function";

export default function newUserHome(props) {
  const firstName = props.currentUser.firstName;
  const currentUser = props.currentUser;
  return (
    <div className="fullHome">
      <div id="welcome">
        <h1 id="welcomeName">Welcome, {firstName}!</h1>
        {!checkDay(currentUser.createdAt) ? <Onboarding /> : null}
      </div>

      <div className="home">
        <div>
          <h2>
            Get started by adding your doctors, conditions, and medications
          </h2>
          <HomeAddButtons currentUser={currentUser} />
        </div>
        <div>
          <img src={home} alt="" />
        </div>
      </div>
    </div>
  );
}
