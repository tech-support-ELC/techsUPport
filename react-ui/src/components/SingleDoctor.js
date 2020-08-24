import React from "react";
// import { connect } from "react-redux";
// import { getSingleDoctor } from "../redux/onedoctor";


export default function SingleDoctor(props) {
    const doctor = props.doctor;

    return (
        <div>
            <div>{doctor.firstName}</div>
            <div>{doctor.lastName}</div>
            <div>{doctor.doctorType}</div>
            <div>{doctor.address}</div>
        </div>

    );

}



