import React from "react";
import { connect } from "react-redux";
import { getAllDoctorsThunk } from "../redux/doctors";
import { AddDoctor } from "./AddDoctor";
// import SingleDoctor from "./SingleDoctor"

class AllDoctors extends React.Component {
    componentDidMount() {
        const userId = this.props.currentUser.id
        this.props.getAllDoctors(userId)
    }
    render() {
        const doctors = this.props.doctors;
        return (
            <div>
                <h1>All Doctors</h1>
                <AddDoctor />
                <div>
                    {doctors.map((doctor) => {
                        return (
                            <div>
                                {doctor !== undefined ? (
                                    <SingleDoctor
                                        key={doctor.id}
                                        doctor={doctor}
                                        user={this.props.currentUser}
                                    />
                                ) : null}
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
        getAllDoctors: (userId) => dispatch(getAllDoctorsThunk(userId)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
