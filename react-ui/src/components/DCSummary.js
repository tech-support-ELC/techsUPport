import React, { Component } from 'react';
import { connect } from 'react-redux';
import UpdateTodayScore from './UpdateTodayScore';
import { getTodayScoreThunk } from '../redux/dcTodayScore';
import { getTodayAppointmentThunk } from'../redux/dcTodayAppointment';
import { getTodayMedsThunk } from '../redux/dcTodayMed'
class DCSummary extends Component {
  constructor() {
    super();
    this.state = {
      isClickedScore: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateScore = this.updateScore.bind(this);
  }
  componentDidMount() {
    this.props.getTodayScore();
    this.props.getTodayMeds();
    this.props.getTodayAppointment();
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
  updateScore() {
    this.setState({isClickedScore: !this.state.isClickedScore})
  }
  render() {
    const todayScore = this.props.todayScore;
    const todayAppointment = this.props.todayAppointment;
    const todayMed = this.props.todayMed;
    console.log(todayScore)
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
          (todayScore && todayScore.length > 0) && todayScore.map((eachScore) => {
            return (
              <div key={eachScore.id}>
                <div>
                  <div>{eachScore.name} {eachScore.rate} {eachScore.notes}</div>
                </div>
                <button type='submit' onClick={()=>this.updateScore()}>
                  Update
                </button>
                {
                  this.state.isClickedScore ? <UpdateTodayScore eachScore={eachScore}updateTodayScore={this.props.updateTodayScore}/> : null
                }
                <button type='submit'>
                  X
                </button>
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

const mapStateToProps = (state) => {
  return {
    todayScore: state.todayScore,
    todayAppointment: state.todayAppointment,
    todayMed: state.todayMed
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTodayScore: () => dispatch(getTodayScoreThunk()),
    getTodayAppointment: () => dispatch(getTodayAppointmentThunk()),
    getTodayMeds: () => dispatch(getTodayMedsThunk()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DCSummary);

