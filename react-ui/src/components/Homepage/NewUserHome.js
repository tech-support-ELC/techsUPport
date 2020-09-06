import React from 'react'
import Onboarding from '../Onboarding'
import HomeAddButtons from '../HomeAddButtons'
import { Link } from 'react-router-dom'
import moment from 'moment'
import home from "../../images/home.png";

export default function newUserHome() {

    return (
        <div>
            <div>
                <h1 id="welcomeName">Welcome, {firstName}!</h1>
                {!checkDay(currentUser.createdAt) ? <Onboarding /> : null}
            </div>
            <h2>
                Get started by adding your doctors, conditions, and medications
        </h2>

            <h2>
                Fill out your daily check-in for {moment().format("MMMM Do YYYY")}
            </h2>
            <div id="dailyCheckinHomePage">
                <Link to="/dailycheckin">
                    <button id="checkin">
                        <span>Daily Check-in</span>
                    </button>
                </Link>
            </div>

            <div>
                <HomeAddButtons />
            </div>
            <div className="mainHomepageArea">
                <img src={home} alt="" />
            </div>
        </div>
    )

}