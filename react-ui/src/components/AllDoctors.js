import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk, addDoctorThunk } from "../redux/doctors";
import { AddDoctor } from "./AddDoctor";
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export class AllDoctors extends React.Component {
    constructor() {
        super()
        this.state = {
            showModal: false
        }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }
    componentDidMount() {
        this.props.getAllDoctors()
    }

    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }
    render() {
        const doctors = this.props.doctors;
        return (
            <div>
                <h1>All Doctors</h1>

                <div>
                    <button onClick={this.openModal}>Add a Doctor</button>
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
                                <Link to={`/doctors/${doctor.id}`}>{doctor.firstName} {doctor.lastName}</Link>
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
        doctors: state.doctors,
        currentUser: state.currentUser
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(getAllDoctorsThunk()),
        addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
