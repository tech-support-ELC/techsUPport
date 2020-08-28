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
        const id = this.props.doctor.id
        this.props.fetchSingleDoctor(id)
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
