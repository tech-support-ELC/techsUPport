import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScoreThunk, addScoreThunk } from '../redux/dcCondition';
import { getAppointmentThunk, addAppointmentThunk } from '../redux/dcDoctor';
import { getMedicationThunk, addMedicationThunk } from '../redux/dcMedication';
import DCMedicationForm from './DCMedicationForm';
import DCConditionForm from './DCConditionForm';
import DCDoctorForm from './DCDoctorForm';
class DailyCheckin extends Component {
  componentDidMount() {
    this.props.getScore();
    this.props.getAppointment();
    this.props.getMedication();
  }
  render() {
    const score = this.props.score;
    const appointment = this.props.appointment;
    const med = this.props.med;
    return (
      <div>
        <h1>Daily checkin</h1>
        <h3>What conditions are you dealing with today?</h3>
        {
          score && score.map(condition => {
            return (
              <div key={condition.id}>
                <DCConditionForm condition={condition} addScore={this.props.addScore} />
              </div>
            )
          })
        }
        <h3>Do you have an appointment with a doctor today?</h3>
        {
          appointment && appointment.map(doctor => {
            return (
              <div key={doctor.id}>
                <DCDoctorForm doctor={doctor} addAppointment={this.props.addAppointment} />
              </div>
            )
          })
        }
        <h3>What medications are you taking today?</h3>
        {
          med && med.map(eachMed => {
            return (
              <div key={eachMed.id}>
                <DCMedicationForm eachMed={eachMed} addMedication={this.props.addMedication} />
              </div>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    score: state.score,
    appointment: state.appointment,
    med: state.med
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getScore: () => dispatch(getScoreThunk()),
    addScore: (score) => dispatch(addScoreThunk(score)),
    getAppointment: () => dispatch(getAppointmentThunk()),
    addAppointment: (appointment) => dispatch(addAppointmentThunk(appointment)),
    getMedication: () => dispatch(getMedicationThunk()),
    addMedication: (med) => dispatch(addMedicationThunk(med))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DailyCheckin)
