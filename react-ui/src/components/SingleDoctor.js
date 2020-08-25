import React, { Component } from "react";
import { connect } from "react-redux";
// import { getSingleDoctor } from "../redux/onedoctor";
import UpdateDoctor from './UpdateDoctor'
import { fetchSingleDoctor } from "../redux/singleDoctor";

export class SingleDoctor extends React.Component {
    componentDidMount() {
        const id = Number(this.props.match.params.id)
        console.log("what is ID", typeof id)
        console.log("what is params", this.props.match.params.id)
        console.log("what are props", this.props)
        this.props.fetchSingleDoctor(id)
    }

    render() {
        const doctor = this.props.doctor[0]
        if (!doctor) {
            return "Loading your doctor"
        } else {
            return (
                <div>
                    <div>{doctor.firstName}</div>
                    <div>{doctor.lastName}</div>
                    <div>{doctor.doctorType}</div>
                    <div>{doctor.address}</div>
                    <button onClick={() => <UpdateDoctor doctor={doctor} />}>Update Doctor</button>
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(SingleDoctor);
