import React, { Component } from 'react';
class DCSummary extends Component {
  constructor() {
    super();
    this.state = {
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const doctorId = this.props.doctor.id;
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
    this.setState({

    })
  }
  render() {
    const todayScore = this.props.todayScore;
    const todayAppointment = this.props.todayAppointment;
    const todayMed = this.props.todayMed;
    return (
      <div>
        Today's summary:
        <div>
          <div>
          {
            todayScore.length > 0 ? "Your Conditions:" : null
          }
          </div>
          {
          todayScore && todayScore.map((eachScore) => {
            return (
              <div key={eachScore.id}>
                <div>
                  <div>{eachScore.name} {eachScore.rate} {eachScore.notes}</div>
                </div>
              </div>
            );
          })
          }
        </div>
        <div>
          <div>
          {
            todayAppointment.length > 0 ? "Your Appointments:" : null
          }
          </div>
        {
          todayAppointment && todayAppointment.map((eachAppointment) => {
            return (
              <div key={eachAppointment.id}>
                <div>
                  <div>{eachAppointment.firstName} {eachAppointment.lastName} {eachAppointment.time.slice(0,5)}</div>
                </div>
              </div>
            );
          })
          }
        </div>
        <div>
          <div>
          {
            todayMed.length > 0 ? "Your Medications:" : null
          }
          </div>
          {
          todayMed && todayMed.map((eachMed) => {
            return (
              <div key={eachMed.id}>
                <div>
                  <div>{eachMed.name} {eachMed.notes}</div>
                </div>
              </div>
            );
          })
          }
        </div>
      </div>
    )
  }
}
export default DCSummary;
