import React from 'react';
import Calendar from 'react-calendar';
import DCDoctorForm from './DCDoctorForm'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { getAppointmentThunk, addAppointmentThunk } from '../redux/dcDoctor';
import { getAllDoctorsThunk } from "../redux/doctors";
import moment from 'moment'

export class AppointmentCalendar extends React.Component {
    constructor() {
        super()
        this.state = {
            showDocModal: false,
            appointmentDay: ''
        }

        this.clickDay = this.clickDay.bind(this)
        this.closeDocModal = this.closeDocModal.bind(this)
        this.onChange = this.onChange.bind(this)
    }

    componentDidMount() {
        this.props.getAppointment()
        this.props.getAllDoctors()
        ReactModal.setAppElement('body')
    }


    clickDay = () => {
        this.setState({ showDocModal: true })
        this.props.getAppointment()
    }

    closeDocModal = () => {
        this.setState({ showDocModal: false })
    }
    onChange = appointmentDay => this.setState({ appointmentDay })
    render() {

        const doctors = this.props.doctors

        return (
            <div styles={{ height: 100, width: 100 }}>
                <div>
                    <Calendar
                        onClickDay={this.clickDay}
                        onChange={this.onChange}
                        value={this.state.appointmentDay}
                        formatLongDate={(locale, date) => moment(date).format('YYYY-MM-DD')}
                    />
                </div>
                <div>
                    <ReactModal
                        isOpen={this.state.showDocModal}
                        contentLabel="Single Document"
                    >
                        <div>
                            <div>
                                <h2>Add an Appointment With Your Doctor</h2>
                            </div>
                            {
                                (doctors && doctors.length > 0) ?
                                    doctors.map((doctor) => {
                                        console.log('what are props', this.props)
                                        let appointmentDate = this.state.appointmentDay

                                        console.log('appointment format', appointmentDate)
                                        return (
                                            <div key={doctor.id}>
                                                <DCDoctorForm
                                                    doctor={doctor}
                                                    addAppointment={this.props.addAppointment}
                                                    appointmentDate={appointmentDate}
                                                />
                                            </div>
                                        );
                                    }) : "You don't have any appointment"
                            }
                        </div>
                        <button onClick={this.closeDocModal}>Done</button>
                    </ReactModal>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        appointment: state.appointment,
        doctors: state.doctors
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctors: () => dispatch(getAllDoctorsThunk()),
        getAppointment: () => dispatch(getAppointmentThunk()),
        addAppointment: (appointment) => dispatch(addAppointmentThunk(appointment)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(AppointmentCalendar);
