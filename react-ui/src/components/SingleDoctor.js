import React, { Component } from "react";
import { connect } from "react-redux";
// import { getSingleDoctor } from "../redux/onedoctor";
import UpdateDoctor from './UpdateDoctor'
import { fetchSingleDoctor } from "../redux/singleDoctor";
import { deleteDoctorThunk } from "../redux/doctors"

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
        const id = Number(this.props.match.params.id)
        this.props.fetchSingleDoctor(id)
    }

    updateDoctor = () => {
        this.setState({ clicked: true })
    }

    async handleDelete(id) {
        try {
            await this.props.deleteDoctor(id)
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        const doctor = this.props.doctor[0]
        if (!doctor) {
            return "This doctor is not in our system"
        } else {
            return (
                <div>
                    <div>{doctor.firstName}</div>
                    <div>{doctor.lastName}</div>
                    <div>{doctor.doctorType}</div>
                    <div>{doctor.address}</div>
                    <div>
                        {this.state.clicked === true && <UpdateDoctor doctor={doctor} />}
                    </div>
                    <button onClick={() => this.updateDoctor()}>Update Doctor</button>
                    <button onClick={() => this.handleDelete(doctor.id)}>Delete Doctor</button>
                    {/* <button onClick={() => }>Delete Doctor</button> */}
                </div>


            )
        };
    }
}



const mapStateToProps = (state) => {
    return {
        doctor: state.doctor,
        currentUser: state.currentUser
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchSingleDoctor: (id) => dispatch(fetchSingleDoctor(id)),
        deleteDoctor: (id) => dispatch(deleteDoctorThunk(id))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleDoctor);
