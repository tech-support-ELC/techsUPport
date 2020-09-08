import React, { Component } from "react";
import { connect } from "react-redux";
import { getTodayScoreThunk } from "../../redux/dcTodayScore";
import { getTodayAppointmentThunk } from "../../redux/dcTodayAppointment";
import { getTodayMedsThunk } from "../../redux/dcTodayMed";
import { getSingleTodayScoreThunk } from "../../redux/dcSingleScore";
import { getSingleTodayAppointmentThunk } from "../../redux/dcSingleAppointment";
import DCSingleTodayAppointment from "../../components/DCSingleTodayAppointment";
import { getSingleTodayMedsThunk } from "../../redux/dcSingleMed";
import ReactModal from "react-modal";
import Onboarding from "../Onboarding";
import HomeAddButtons from "../HomeAddButtons";
import moment from "moment";
import home from "../../images/home.png";
import Heatmap from "../../components/datavis/CalendarHeatmap";
import { Link } from "react-router-dom";
import checkDay from "../../utils/onboarding-date-function";
import possibleData from "../../images/possible-data.png";
import { fetchMedications } from "../../redux/medications";
import BarChart from "../datavis/BarChart";
import turtlepredc from "../../images/turtlepredc.png";

class afterDCHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDocModal: false,
    };
    this.closeDocModal = this.closeDocModal.bind(this);
    this.openDocModal = this.openDocModal.bind(this);
  }
  componentDidMount() {
    this.props.getTodayScore();
    this.props.getTodayMeds();
    this.props.getTodayAppointment();
    this.props.getMedications();
    ReactModal.setAppElement("body");
  }
  openDocModal(id) {
    this.setState({ showDocModal: true });
    this.props.getSingleTodayAppointment(id);
  }

  closeDocModal() {
    this.setState({ showDocModal: false });
  }

  render() {
    const todayScore = this.props.todayScore;
    const todayAppointment = this.props.todayAppointment;
    const todayMed = this.props.todayMed;
    const medications = this.props.medications;
    const chart = this.props.chart;
    const currentUser = this.props.currentUser;
    const firstName = this.props.currentUser.firstName;
    const findMedDosage = (medication, medArray) => {
      for (let i = 0; i < medArray.length; i++) {
        let currentMed = medArray[i];
        if (medication.medicationId === currentMed.id) {
          return (
            <div>
              <div>
                Dosage: {currentMed.dosage} {currentMed.dosageUnit}
              </div>
              <div>
                Frequency: {currentMed.frequency} per {currentMed.frequencyUnit}
              </div>
            </div>
          );
        }
      }
    };

    return (
      <div className="fullHome">
        <div className="home">
          <div id="dailyCheckinHomePage">
            <h2>
              From my{" "}
              <Link id="checkinLink" to="/dailycheckin">
                <button id="checkin">
                  <span>Daily Check-in</span>
                </button>
              </Link>{" "}
              for {moment().format("MMMM Do YYYY")}
            </h2>
            <div>
              <div>
                {todayMed.length > 0 ? (
                  "Today's Medications:"
                ) : (
                  <div>
                    <h4>No medications recorded today</h4>
                  </div>
                )}
              </div>
              <div className="scroll">
                {todayMed &&
                  todayMed.length > 0 &&
                  todayMed.map((eachMed) => {
                    return (
                      <div className="listItem" key={eachMed.id}>
                        {eachMed.name}
                        {findMedDosage(eachMed, medications)}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="mainHomepageArea">
            <div>
              <div>
                <div>
                  {todayAppointment.length > 0 ? (
                    "Today's Appointments:"
                  ) : (
                    <div>
                      <h4>No appointments recorded today</h4>
                    </div>
                  )}
                </div>
                {todayAppointment &&
                  todayAppointment.length > 0 &&
                  todayAppointment.map((eachAppointment) => {
                    return (
                      <div key={eachAppointment.id}>
                        <button
                          type="button"
                          onClick={() => this.openDocModal(eachAppointment.id)}
                        >
                          {eachAppointment.firstName} {eachAppointment.lastName}{" "}
                          {eachAppointment.time.slice(0, 5)}
                        </button>
                        <ReactModal
                          isOpen={this.state.showDocModal}
                          contentLabel="Single Document"
                          className="popup"
                        >
                          <DCSingleTodayAppointment
                            closeTheModal={this.closeDocModal}
                          />
                          <button onClick={this.closeDocModal}>Close</button>
                        </ReactModal>
                      </div>
                    );
                  })}
              </div>
            </div>

            <div id="afterViz">
              <div>
                {todayScore.length > 0 ? (
                  <p> Today's Conditions:</p>
                ) : (
                  <div>
                    <h4>No conditions recorded today</h4>
                  </div>
                )}
                <div>
                  {todayScore && todayScore.length > 0 ? <BarChart /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="afterHeatmap">
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
}

const mapStateToProps = (state) => {
  return {
    todayScore: state.todayScore,
    todayAppointment: state.todayAppointment,
    todayMed: state.todayMed,
    med: state.med,
    currentUser: state.currentUser,
    medications: state.medications,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTodayScore: () => dispatch(getTodayScoreThunk()),
    getTodayAppointment: () => dispatch(getTodayAppointmentThunk()),
    getTodayMeds: () => dispatch(getTodayMedsThunk()),
    getSingleTodayScore: (id) => dispatch(getSingleTodayScoreThunk(id)),
    getSingleTodayAppointment: (id) =>
      dispatch(getSingleTodayAppointmentThunk(id)),
    getSingleTodayMeds: (id) => dispatch(getSingleTodayMedsThunk(id)),
    getMedications: () => dispatch(fetchMedications()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(afterDCHome);
