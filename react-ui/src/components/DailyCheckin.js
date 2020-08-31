import React, { Component } from "react";
import { connect } from "react-redux";
import { getScoreThunk, addScoreThunk } from "../redux/dcCondition";
import { addAppointmentThunk } from "../redux/dcDoctor";
import { getMedicationThunk, addMedicationThunk } from "../redux/dcMedication";
import DCMedicationForm from "./DCMedicationForm";
import DCConditionForm from "./DCConditionForm";
import DCDoctorForm from "./DCDoctorForm";
import { getAllDoctorsThunk } from "../redux/doctors";
class DailyCheckin extends Component {
  componentDidMount() {
    this.props.getScore();
    this.props.getAllDoctors();
    this.props.getMedication();
  }
  render() {
    const score = this.props.score;
    const doctors = this.props.doctors;
    const med = this.props.med;
    return (
      <div className="main" id="daily">
        <h1>Daily Check-in</h1>
        <div className="daily">
          <div className="dailyColumn">
            <h3>What conditions are you dealing with today?</h3>
            {score &&
              score.map((condition) => {
                return (
                  <div key={condition.id}>
                    <DCConditionForm
                      condition={condition}
                      addScore={this.props.addScore}
                    />
                  </div>
                );
              })}
          </div>
          <div className="dailyColumn">
            <h3>Do you have an appointment with a doctor today?</h3>
            {doctors &&
              doctors.map((doctor) => {
                return (
                  <div key={doctor.id}>
                    <DCDoctorForm
                      doctor={doctor}
                      addAppointment={this.props.addAppointment}
                    />
                  </div>
                );
              })}
          </div>
          <div className="dailyColumn">
            <h3>What medications are you taking today?</h3>
            {med &&
              med.map((eachMed) => {
                return (
                  <div key={eachMed.id}>
                    <DCMedicationForm
                      eachMed={eachMed}
                      addMedication={this.props.addMedication}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    score: state.score,
    appointment: state.appointment,
    doctors: state.doctors,
    med: state.med,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getScore: () => dispatch(getScoreThunk()),
    addScore: (score) => dispatch(addScoreThunk(score)),
    getAllDoctors: () => dispatch(getAllDoctorsThunk()),
    addAppointment: (appointment) => dispatch(addAppointmentThunk(appointment)),
    getMedication: () => dispatch(getMedicationThunk()),
    addMedication: (med) => dispatch(addMedicationThunk(med)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DailyCheckin);
