import React, { Component } from 'react';
import { connect } from 'react-redux';
import DCSingleTodayScore from './DCSingleTodayScore';
import { getTodayScoreThunk } from '../redux/dcTodayScore';
import { getTodayAppointmentThunk } from '../redux/dcTodayAppointment';
import { getTodayMedsThunk } from '../redux/dcTodayMed';
import { getSingleTodayScoreThunk } from '../redux/dcSingleScore';
import { getSingleTodayAppointmentThunk } from '../redux/dcSingleAppointment';
import DCSingleTodayAppointment from './DCSingleTodayAppointment';
import { getSingleTodayMedsThunk } from '../redux/dcSingleMed';
import DCSingleTodayMed from './DCSingleTodayMed';
import ReactModal from "react-modal";
import Onboarding from '../Onboarding'
import HomeAddButtons from '../HomeAddButtons'
import moment from 'moment'
import home from "../../images/home.png";
import Heatmap from "./datavis/CalendarHeatmap";

class afterDCHome extends React.Component {
    constructor() {
        super();
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
        this.props.getMedication();
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
        const med = this.props.med;
        const findMedDosage = (medication, medArray) => {
            for (let i = 0; i < medArray.length; i++) {
                let currentMed = medArray[i]
                if (medication.medicationId === currentMed.id) {
                    return (
                        <div>
                            <div>Dosage: {currentMed.dosage} {currentMed.dosageUnit}</div>
                            <div>Frequency: {currentMed.frequency} {currentMed.frequencyUnit}</div>
                        </div>
                    )
                }
            }
        }

        return (
            <div>
                <div>
                    <h1 id="welcomeName">Welcome, {firstName}!</h1>
                    {!checkDay(currentUser.createdAt) ? <Onboarding /> : null}
                </div>

                <div>
                    <HomeAddButtons />
                </div>
                <div className="mainHomepageArea">
                    <h2>
                        From my Daily Checkin for {moment().format("MMMM Do YYYY")}
                    </h2>


                    <div>

                        <div>
                            <div>
                                {
                                    todayAppointment.length > 0 ? "Today's Appointments:" : (<div><h4>No appointments recorded today</h4></div>)
                                }
                            </div>
                            {
                                (todayAppointment && todayAppointment.length > 0) && todayAppointment.map((eachAppointment) => {
                                    return (
                                        <div key={eachAppointment.id}>
                                            <button type="button"
                                                onClick={() => this.openDocModal(eachAppointment.id)}>
                                                {eachAppointment.firstName}
                                                {' '}
                                                {eachAppointment.lastName}
                                                {' '}
                                                {eachAppointment.time.slice(0, 5)}
                                            </button>
                                            <ReactModal
                                                isOpen={this.state.showDocModal}
                                                contentLabel="Single Document"
                                                className="popup"
                                            >
                                                <DCSingleTodayAppointment closeTheModal={this.closeDocModal} />
                                                <button onClick={this.closeDocModal}>Close</button>
                                            </ReactModal>
                                        </div>
                                    );
                                })
                            }
                        </div>




                    </div>


                    <div>
                        <div>
                            {
                                todayMed.length > 0 ? "Today's Medications:" : (<div><h4>No medications recorded today</h4></div>)
                            }
                        </div>
                        <div>
                            {
                                (todayMed && todayMed.length > 0) && todayMed.map((eachMed) => {
                                    return (
                                        <div key={eachMed.id}>
                                            <ul>
                                                <li>{eachMed.name}
                                                    {
                                                        findMedDosage(eachMed, med)
                                                    }
                                                </li>
                                            </ul>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>

                    <div>
                        <h3>
                            My Conditions Today
                        </h3>
                        <h4>
                            placeholder: chart of today's conditions
                        </h4>
                        <div>
                            {
                                (todayScore && todayScore.length > 0) ?
                                    (<div><h4>
                                        placeholder: chart of today's conditions
                                </h4></div>) : null
                            }
                        </div>
                    </div>

                    <div className="mainHomepageArea">
                        {
                            (chart && chart.length > 0) ? <Heatmap /> : (
                                <div>
                                    <h4>Fill out your daily checkin and start seeing your data over time</h4>
                                    <img src={possibleData} alt="" />
                                </div>
                            )
                        }
                    </div>


                </div>
            </div>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        todayScore: state.todayScore,
        todayAppointment: state.todayAppointment,
        todayMed: state.todayMed,
        med: state.med,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getTodayScore: () => dispatch(getTodayScoreThunk()),
        getTodayAppointment: () => dispatch(getTodayAppointmentThunk()),
        getTodayMeds: () => dispatch(getTodayMedsThunk()),
        getSingleTodayScore: (id) => dispatch(getSingleTodayScoreThunk(id)),
        getSingleTodayAppointment: (id) => dispatch(getSingleTodayAppointmentThunk(id)),
        getSingleTodayMeds: (id) => dispatch(getSingleTodayMedsThunk(id)),
        getMedication: () => dispatch(getMedicationThunk()),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(afterDCHome);
