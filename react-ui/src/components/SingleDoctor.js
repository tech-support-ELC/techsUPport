import React from "react";
import { connect } from "react-redux";
// import { getSingleDoctor } from "../redux/onedoctor";
import UpdateDoctor from './UpdateDoctor'
import { fetchSingleDoctor } from "../redux/singleDoctor";
import { deleteDoctorThunk } from "../redux/doctors"
import { getAppointmentThunk } from "../redux/dcDoctor"

export class SingleDoctor extends React.Component {
    constructor() {
        super()
        this.state = {
            clicked: false
        }
        this.updateDoctor = this.updateDoctor.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }
    componentDidMount() {
        const id = this.props.doctor.id
        this.props.fetchSingleDoctor(id)
        this.props.getAppointments()
    }

    updateDoctor = () => {
        this.setState({ clicked: true })
    }

    async handleDelete(id) {
        try {
            await this.props.deleteDoctor(id)
            this.props.closeTheModal()
        } catch (err) {
            console.log(err)
        }
    }



    render() {
        const doctor = this.props.doctor
        const appointments = this.props.appointment
        const filterApps = (appointmentArray) => {
            return (appointmentArray.filter((oneapp) => {
                return (
                    oneapp.doctorId === doctor.id)
            }))
        }
        const docApps = filterApps(appointments)

        if (!doctor) {
            return "This doctor is not in our system"
        } else {
            return (
                <div>
                    <div>Doctor: {doctor.firstName} {doctor.lastName}</div>
                    <div>Specialty: {doctor.doctorType}</div>
                    <div>Address: {doctor.address}</div>
                    <div>
                        {this.state.clicked === true && <UpdateDoctor />}
                    </div>
                    <div>
                        {this.state.clicked === false &&
                            <button onClick={() => this.updateDoctor()}>Update Doctor</button>
                        }
                    </div>
                    <button onClick={() => this.handleDelete(doctor.id)}>Delete Doctor</button>
                    <div>
                        <div>My Appointments with {doctor.firstName} {doctor.lastName} </div>
                        <ul>
                            {
                                docApps.map((oneapp) => {
                                    return (
                                        <li key={oneapp.id}>
                                            <div>Date: {oneapp.appointmentDate}</div>
                                            <div>Time: {oneapp.time}</div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>


            )
        };
    }
}



const mapStateToProps = (state) => {
    return {
        doctor: state.doctor,
        currentUser: state.currentUser,
        appointment: state.appointment
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleDoctor: (id) => dispatch(fetchSingleDoctor(id)),
        deleteDoctor: (id) => dispatch(deleteDoctorThunk(id)),
        getAppointments: () => dispatch(getAppointmentThunk())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleDoctor);
