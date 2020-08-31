import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { fetchSingleDoctor } from "../redux/singleDoctor";
import { AddDoctor } from "./AddDoctor";
import ReactModal from 'react-modal'
import SingleDoctor from './SingleDoctor'
import { getAppointmentThunk } from "../redux/dcDoctor"


export class AllDoctors extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false,
            showDocModal: false
        }
        this.openModal = this.openModal.bind(this)
        this.openDocModal = this.openDocModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
        this.closeDocModal = this.closeDocModal.bind(this)
    }
    componentDidMount() {
        ReactModal.setAppElement('body')
        this.props.getAllDoctors()
    }

    openModal() {
        this.setState({ showModal: true })
    }

    openDocModal(id) {
        this.setState({ showDocModal: true })
        this.props.fetchSingleDoctor(id)
        this.props.getAppointments()
    }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeDocModal() {
    this.setState({ showDocModal: false });
  }
  render() {
    const doctors = this.props.doctors;
    return (
      <div className="main">
        <div className="column">
          <h3>My Doctors</h3>
          <div className="scroll">
            {doctors &&
              doctors.map((doctor) => {
                return (
                  <div className="listItem" key={doctor.id}>
                    <button
                      className="bigButton"
                      onClick={() => this.openDocModal(doctor.id)}
                    >
                      {doctor.firstName} {doctor.lastName}
                    </button>
                    <ReactModal
                      isOpen={this.state.showDocModal}
                      contentLabel="Single Document"
                    >
                      <SingleDoctor closeTheModal={this.closeDocModal} />
                      <button onClick={this.closeDocModal}>close</button>
                    </ReactModal>
                </div>
                <div>
                    {doctors && doctors.map((doctor) => {
                        return (
                            <div key={doctor.id}>
                                <button onClick={() => this.openDocModal(doctor.id)}>{doctor.firstName} {doctor.lastName}</button>
                                <ReactModal
                                    isOpen={this.state.showDocModal}
                                    contentLabel="Example Modal"
                                >
                                    <SingleDoctor closeTheModal={this.closeDocModal} />
                                    <button onClick={this.closeDocModal}>close</button>
                                </ReactModal>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        doctor: state.doctor,
        doctors: state.doctors,
        currentUser: state.currentUser,
        appointment: state.appointment
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(getAllDoctorsThunk()),
        addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
        fetchSingleDoctor: (id) => dispatch(fetchSingleDoctor(id)),
        getAppointments: () => dispatch(getAppointmentThunk())
    };

};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
