import React from "react";
import { connect } from "react-redux";
import { getAppointmentThunk } from "../redux/dcDoctor";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { getAllConditionsThunk, addConditionThunk } from "../redux/conditions";
import { fetchMedications } from "../redux/medications";
import { getChartThunk } from "../redux/score";
import NewUserHome from '../components/Homepage/NewUserHome'
import BeforeDCHome from '../components/Homepage/BeforeDCHome'
import AfterDCHome from '../components/Homepage/AfterDCHome'
import { Link } from 'react-router-dom'
import 'react-calendar-heatmap/dist/styles.css';
import BarChart from './datavis/BarChart'
import { getTodayScoreThunk } from "../redux/dcTodayScore";

export class Home extends React.Component {
  componentDidMount() {
    // this.props.getChart();
    // this.props.getAllDoctors();
    // this.props.getAppointments();
    // this.props.getAllConditions();
    // this.props.getMedications();
  }
  render() {
    const { firstName } = this.props.currentUser;
    const doctors = this.props.doctors;
    const conditions = this.props.conditions;
    const medications = this.props.medications;
    const currentUser = this.props.currentUser;
    const chart = this.props.chart;
    const todayScore = this.props.todayScore;
    const todayAppointment = this.props.todayAppointment;
    const todayMed = this.props.todayMed;
    return (



      <div>
        {/* if you have no info in the database */}
        {(doctors.length === 0 &&
          conditions.length === 0 &&
          medications.length === 0) ? (
            <div><NewUserHome currentUser={currentUser} /> </div>

          ) :

          // before daily checkin
          ((doctors.length > 0 ||
            conditions.length > 0 ||
            medications.length > 0) &&
            (todayScore.length === 0 &&
              todayAppointment.length === 0 &&
              todayMed.length === 0)) ?
            <BeforeDCHome chart={chart} currentUser={currentUser} /> :

            //after daily checkin
            ((doctors.length > 0 ||
              conditions.length > 0 ||
              medications.length > 0) &&
              (todayScore.length > 0 ||
                todayAppointment.length > 0 ||
                todayMed.length > 0)) ?
              <AfterDCHome chart={chart} currentUser={currentUser} /> : null
        }

      </div>

    )
  }
}

const mapState = (state) => {
  return {
    doctors: state.doctors,
    conditions: state.conditions,
    currentUser: state.currentUser,
    appointment: state.appointment,
    medications: state.medications,
    chart: state.chart,
    todayScore: state.todayScore,
    todayAppointment: state.todayAppointment,
    todayMed: state.todayMed
  };
};

const mapDispatch = (dispatch) => ({
  // getAllDoctors: () => dispatch(getAllDoctorsThunk()),
  // getAppointments: () => dispatch(getAppointmentThunk()),
  // getAllConditions: () => dispatch(getAllConditionsThunk()),
  // addCondition: (condition) => dispatch(addConditionThunk(condition)),
  // addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
  // getMedications: () => dispatch(fetchMedications()),
  // getChart: () => dispatch(getChartThunk()),
});

export default connect(mapState, null)(Home);
