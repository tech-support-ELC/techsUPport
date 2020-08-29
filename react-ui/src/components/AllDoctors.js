import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { fetchSingleDoctor } from '../redux/singleDoctor'
import { AddDoctor } from "./AddDoctor";
import ReactModal from 'react-modal'
import SingleDoctor from './SingleDoctor'

// const customStyles = {
//     content: {
//         top: '50%',
//         left: '50%',
//         right: 'auto',
//         bottom: 'auto',
//         marginRight: '-50%',
//         transform: 'translate(-50%, -50%)'
//     }
// };

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
        this.props.getAllDoctors()
    }

    openModal() {
        this.setState({ showModal: true })
    }

    openDocModal(id) {
        this.setState({ showDocModal: true })
        this.props.fetchSingleDoctor(id)
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    closeDocModal() {
        this.setState({ showDocModal: false })
    }
    render() {
        const doctors = this.props.doctors;
        return (
            <div>

                <div>
                    <button onClick={this.openModal}>Add a Doctor</button>
                    <h1>My Doctors</h1>
                    <ReactModal
                        isOpen={this.state.showModal}
                        contentLabel="Example Modal"
                    >
                        <AddDoctor currentUser={this.props.currentUser} addNewDoctor={this.props.addNewDoctor} />

                        <button onClick={this.closeModal}>close</button>
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
        currentUser: state.currentUser
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(getAllDoctorsThunk()),
        addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
        fetchSingleDoctor: (id) => dispatch(fetchSingleDoctor(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
