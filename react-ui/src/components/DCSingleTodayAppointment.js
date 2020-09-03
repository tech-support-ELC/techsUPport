import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodayAppointmentThunk } from "../redux/dcTodayAppointment";
import UpdateTodayAppointment from "./UpdateTodayAppointment";
class DCSingleTodayAppointment extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.updateAppointment = this.updateAppointment.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  updateAppointment = () => {
    this.setState({ clicked: true });
  };
  async handleDelete(id) {
    try {
      await this.props.removeTodayAppointment(id);
      this.props.closeTheModal();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const singleTodayAppointment = this.props.singleTodayAppointment;
    if (!singleTodayAppointment) {
      return "This Appointment is not in our system";
    } else {
      // const time = singleTodayAppointment.time.slice(0,5)
      return (
        <div>
          <div>Doctor Name: {singleTodayAppointment.firstName} {singleTodayAppointment.lastName}</div>
          <div>Time: {singleTodayAppointment.time}</div>
          <div>{this.state.clicked && <UpdateTodayAppointment eachAppointment={singleTodayAppointment}/>}</div>
          <div>
            {!this.state.clicked && (
              <button onClick={() => this.updateAppointment()}>
                Update
              </button>
            )}
          </div>
          {
            <button
              type="submit"
              onClick={() => this.handleDelete(singleTodayAppointment.id)}
            >
              Delete
            </button>
          }
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    singleTodayAppointment: state.singleTodayAppointment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeTodayAppointment: (id) => dispatch(deleteTodayAppointmentThunk(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DCSingleTodayAppointment);
