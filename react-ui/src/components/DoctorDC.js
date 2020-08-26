import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getAppointmentThunk, addAppointmentThunk} from '../redux/dcDoctor';
import DCDoctorForm from './DCDoctorForm';
class DoctorDC extends Component {
  componentDidMount() {
    this.props.getAppointment();
  }
  render() {
    const appointment = this.props.appointment;
    console.log(this.props)
    return (
      <div>
        <h1>Daily checkin</h1>
        <h3>Doctors</h3>
        {
          appointment && appointment.map(doctor => {
            return (
              <div key={doctor.id}>
                <DCDoctorForm doctor={doctor} addAppointment={this.props.addAppointment}/>
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
    appointment: state.appointment
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAppointment: () => dispatch(getAppointmentThunk()),
    addAppointment: (appointment) => dispatch(addAppointmentThunk(appointment))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DoctorDC)
