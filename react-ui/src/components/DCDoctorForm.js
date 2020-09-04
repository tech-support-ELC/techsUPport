import React, { Component } from 'react';
import moment from 'moment'

class DCDoctorForm extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      time: '',
      doctorId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const doctorId = this.props.doc.id;
    this.setState({ doctorId });
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    if (this.props.appointmentDate) {
      const date = this.props.appointmentDate
      let appointmentDate = moment(date).format('YYYY-MM-DD')
      let time = this.state.time
      let doctorId = this.state.doctorId
      this.props.addAppointment({ time, doctorId, appointmentDate })
    } else {
      this.props.addAppointment(this.state)
    }
    console.log('props inside daily checkin submit', this.props)
    this.setState({
      isClicked: false,
      time: '',
      doctorId: 0
    })
  }
  render() {
    const doc = this.props.doc;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {doc.firstName} {doc.lastName}
          <input
            type='checkbox'
            name='isClicked'
            onChange={this.handleChange}
          // disabled={this.state.isClicked}
          />
        </label>
        {
          this.state.isClicked ?
            <div>
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
              <button type="submit" onClick={!this.state.isClicked}>
                Submit
          </button>
            </div> : null
        }
      </form>
    )
  }
}
export default DCDoctorForm;
