import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  updateTodayAppointmentThunk
} from '../redux/dcTodayAppointment'
class UpdateTodayAppointment extends Component {
  constructor() {
    super();
    this.state = {
      time: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const id = this.props.eachAppointment.id
    this.props.updateTodayAppointment(id, this.state)
    this.setState({
      time: ''
    })
  }
  render() {
    const lastName = this.props.eachAppointment.lastName;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Update Appointment with dr.{lastName} </h1>
        <div>
        <label>
          Time of your appointment
          <input
            className='input'
            placeholder='HH:MM'
            type='text'
            name='time'
            onChange={this.handleChange}
            value={this.state.time}
          />
            </label>
        </div>
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateTodayAppointment: (id, todayAppointment) => (dispatch(updateTodayAppointmentThunk(id, todayAppointment)))
  }
}
export default connect(null, mapDispatchToProps)(UpdateTodayAppointment)
