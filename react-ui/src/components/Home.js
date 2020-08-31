import React from 'react'
import { connect } from 'react-redux'
import DoctorDonut from './datavis/doctor-appointment-donut'
import { getAppointmentThunk } from '../redux/dcDoctor'
import { getAllDoctorsThunk } from '../redux/doctors'
import LineChart from './lineChart/LineChartCondition'



export class Home extends React.Component {

  componentDidMount() {
    this.props.getAllDoctors()
    this.props.getAppointments()
  }

  render() {
    const { firstName } = this.props.currentUser
    const appointments = this.props.appointment
    const doctors = this.props.doctors
    return (
      <div>
        <h1>Welcome {firstName}!</h1>
        <div>
          {
            (doctors && doctors.length > 0 && appointments && appointments.length > 0) ?
              <DoctorDonut appointment={appointments} doctors={doctors} /> : null
          }
        </div>
        <div>
          <LineChart />
        </div>

      </div >
    )
  }
}
const mapState = (state) => {
  return {
    doctors: state.doctors,
    currentUser: state.currentUser,
    appointment: state.appointment
  }
}

const mapDispatch = (dispatch) => ({
  getAllDoctors: () => dispatch(getAllDoctorsThunk()),
  getAppointments: () => dispatch(getAppointmentThunk())
})

export default connect(mapState, mapDispatch)(Home)
