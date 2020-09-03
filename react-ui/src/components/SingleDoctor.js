import React from "react";
import { connect } from "react-redux";
// import { getSingleDoctor } from "../redux/onedoctor";
import UpdateDoctor from "./UpdateDoctor";
import { deleteDoctorThunk } from "../redux/doctors";

export class SingleDoctor extends React.Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.updateDoctor = this.updateDoctor.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  updateDoctor = () => {
    this.setState({ clicked: true });
  };

  async handleDelete(id) {
    try {
      await this.props.deleteDoctor(id);
      this.props.closeTheModal();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const doctor = this.props.doctor;
    const appointments = this.props.appointment;
    const filterApps = (appointmentArray) => {
      return appointmentArray.filter((oneapp) => {
        return oneapp.doctorId === doctor.id;
      });
    };
    const docApps = filterApps(appointments);

    if (!doctor) {
      return "This doctor is not in our system";
    } else {
      return (
        <div>
          <div>
            Doctor: {doctor.firstName} {doctor.lastName}
          </div>
          <div>Specialty: {doctor.doctorType}</div>
          <div>Address: {doctor.address}</div>

          <div>{this.state.clicked === true && <UpdateDoctor />}</div>
          <div className="buttons">
            {this.state.clicked === false && (
              <>
                <button onClick={() => this.updateDoctor()}>Update</button>
                <button onClick={() => this.handleDelete(doctor.id)}>
                  Delete
                </button>
              </>
            )}
          </div>

          <div>
            <div>
              My Appointments with {doctor.firstName} {doctor.lastName}
            </div>
            <ul>
              {docApps.map((oneapp) => {
                return (
                  <li key={oneapp.id}>
                    <div>Date: {oneapp.appointmentDate}</div>
                    <div>Time: {oneapp.time}</div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    doctor: state.doctor,
    currentUser: state.currentUser,
    appointment: state.appointment,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    deleteDoctor: (id) => dispatch(deleteDoctorThunk(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleDoctor);
