// import React from "react";
// import { connect } from "react-redux";
// import { getAllDoctorsThunk } from "../redux/doctors";
// import { AddDoctor } from "./AddDoctor";
// // import SingleDoctor from "./SingleDoctor"

// class AllDoctors extends React.Component {
//     componentDidMount() {
//         this.props.getAllDoctors()
//     }
//     render() {
//         const doctors = this.props.doctors;
//         return (
//             <div>
//                 <h1>All Doctors</h1>
//                 <AddDoctor />
//                 {/* <div>
//                     {doctors.map((doctor) => {
//                         return (
//                             <div>
//                                 {doctor !== undefined ? (
//                                     <SingleDoctor
//                                         key={doctor.id}
//                                         doctor={doctor}
//                                         user={this.props.user}
//                                     />
//                                 ) : null}
//                             </div>
//                         )
//                     })}
//                 </div> */}
//             </div>
//         );
//     }
// }
// const mapStateToProps = (state) => {
//     return {
//         doctors: state.doctors,
//         user: state.user
//     };
// };
// const mapDispatchToProps = (dispatch) => {
//     return {
//         getAllDoctors: () => dispatch(getAllDoctorsThunk()),
//     };
// };
// export default connect(mapStateToProps, mapDispatchToProps)(AllDoctors);
