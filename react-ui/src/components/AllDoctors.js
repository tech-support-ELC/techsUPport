import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk } from "../redux/doctors";
import { AddDoctor } from "./AddDoctor";
import SingleDoctor from "./SingleDoctor"

export class AllDoctors extends React.Component {
    componentDidMount() {
        this.props.getAllDoctors()
    }
    render() {
        const doctors = this.props.doctors;
        return (
            <div>
                <h1>All Doctors</h1>
                <AddDoctor />
                <div>
                    {doctors && doctors.map((doctor) => {
                        return (
                            <div>
                                <SingleDoctor
                                    key={doctor.id}
                                    doctor={doctor}
                                    user={this.props.currentUser}
                                />
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
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
