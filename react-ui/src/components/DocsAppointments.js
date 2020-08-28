// import React from "react";
// import { getDocsAppointmentsThunk } from '../redux/dcDoctor'
// import { connect } from 'react-redux'


// export class DocsAppointments extends React.Component {
//     componentDidMount() {
//         const docId = this.props.doctor.id
//         this.props.getAppointments(docId)
//     }

//     render() {
//         const appointment = this.props.appointment

//         return (
//             <div>
//                 {
//                     appointment && appointment.map((oneapp) => {
//                         return (
//                             <div key={oneapp.id}>
//                                 <div>{oneapp.appointmentDate}</div>
//                                 <div>{oneapp.notes}</div>
//                             </div>
//                         )
//                     })
//                 }
//             </div>
//         )

//     }
// }

// const mapStateToProps = (state) => {
//     return {
//         appointment: state.appointment,
//         doctor: state.doctor
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         getAppointments: (docId) => dispatch(getDocsAppointmentsThunk(docId))
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(DocsAppointments)