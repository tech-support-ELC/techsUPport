import React from "react";
import Onboarding from "../Onboarding";
import HomeAddButtons from "../HomeAddButtons";
import { Link } from "react-router-dom";
import moment from "moment";
import possibleData from "../../images/possible-data.png";
import Heatmap from "../../components/datavis/CalendarHeatmap";
import checkDay from "../../utils/onboarding-date-function";
import turtlepredc from "../../images/turtlepredc.png";

export default function BeforeDCHome(props) {
  const chart = props.chart; //send this as props form home
  const currentUser = props.currentUser;
  const firstName = props.currentUser.firstName;

  return (
    <div className="fullHome">
      <div className="home">
        <div id="dailyCheckinHomePage">
          <div id="welcome">
            <h1 id="welcomeName">Welcome, {firstName}!</h1>
            {!checkDay(currentUser.createdAt) ? <Onboarding /> : null}
          </div>
          <h2>
            Fill out your daily check-in for {moment().format("MMMM Do YYYY")}
          </h2>
          <Link id="checkinLink" to="/dailycheckin">
            <button id="checkin">
              <span>Daily Check-in</span>
            </button>
            <img id="smallTurtle" src={turtlepredc} />
          </Link>
          <HomeAddButtons currentUser={currentUser} />
        </div>

        <div className="mainHomepageArea">
          <img id="turtle" src={turtlepredc} />
        </div>
      </div>
      <div id="heatmap">
        {chart && chart.length > 0 ? (
          <Heatmap />
        ) : (
          <div>
            <h4>
              Fill out your daily checkin to start seeing your data over time
            </h4>
            <img src={possibleData} alt="" />
          </div>
        )}
      </div>
    </div>
  );
}
