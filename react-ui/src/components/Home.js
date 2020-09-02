import React from 'react'
import { connect } from 'react-redux'
import DoctorDonut from './datavis/doctor-appointment-donut'
import { getAppointmentThunk } from '../redux/dcDoctor'
import { getAllDoctorsThunk, addDoctorThunk } from '../redux/doctors'
import { getAllConditionsThunk, addConditionThunk } from '../redux/conditions'
import LineChart from './lineChart/LineChartCondition'
import { fetchMedications } from "../redux/medications";
import { getChartThunk } from '../redux/score'
import home from '../images/home.png'
import HomeAddButtons from './HomeAddButtons'
import moment from 'moment'
import { Link } from 'react-router-dom'
import ReactModal from 'react-modal'


export class Home extends React.Component {
  constructor() {
    super()
    this.state = {
      showDoctorModal: false,
      showConditionModal: false,
      showMedicineModal: false
    }
    this.openDoctorModal = this.openDoctorModal.bind(this)
    this.openConditionModal = this.openConditionModal.bind(this)
    this.openMedicineModal = this.openMedicineModal.bind(this)
    this.closeDoctorModal = this.closeDoctorModal.bind(this)
    this.closeConditionModal = this.closeConditionModal.bind(this)
    this.closeMedicineModal = this.closeMedicineModal.bind(this)
  }

  openDoctorModal() {
    this.setState({ showDoctorModal: true })
  }
  openConditionModal() {
    this.setState({ showConditionModal: true })
  }
  openMedicineModal() {
    this.setState({ showMedicineModal: true })
  }

  closeDoctorModal() {
    this.setState({ showDoctorModal: false })
  }
  closeConditionModal() {
    this.setState({ showConditionModal: false })
  }
  closeMedicineModal() {
    this.setState({ showMedicineModal: false })
  }

  componentDidMount() {
    ReactModal.setAppElement("body")
    this.props.getAllDoctors()
    this.props.getAppointments()
    this.props.getAllConditions()
    this.props.getMedications()
    this.props.getChart()
  }

  render() {
    const { firstName } = this.props.currentUser
    const appointments = this.props.appointment
    const doctors = this.props.doctors
    const conditions = this.props.conditions
    const medications = this.props.medications
    const chart = this.props.chart
    return (
      <div>
        <h1>Welcome {firstName}!</h1>
        <div>
          {
            (doctors.length === 0 && conditions.length === 0 && medications.length === 0) ?
              (
                <h2>Get started by adding your doctors, conditions, and medications</h2>
              ) : null
          }
          <h2>Fill out your daily checkin for {moment().format('MMMM Do YYYY')}</h2>
          <Link to="/dailycheckin">
            <button renderAs="button">
              <span>Daily Checkin</span>
            </button>
          </Link>
          <HomeAddButtons />
          <>
            <img src={home} alt="" />
          </>
        </div>
        {
          (doctors && doctors.length > 0 && appointments && appointments.length > 0) ?
            <DoctorDonut appointment={appointments} doctors={doctors} /> :
            (chart && chart.length > 0) ?
              <LineChart />
              : null
        }
      </div>

    )
  }
}
const mapState = (state) => {
  return {
    doctors: state.doctors,
    conditions: state.conditions,
    currentUser: state.currentUser,
    appointment: state.appointment,
    medications: state.medications,
    chart: state.chart
  }
}

const mapDispatch = (dispatch) => ({
  getAllDoctors: () => dispatch(getAllDoctorsThunk()),
  getAppointments: () => dispatch(getAppointmentThunk()),
  getAllConditions: () => dispatch(getAllConditionsThunk()),
  addCondition: (condition) => dispatch(addConditionThunk(condition)),
  addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
  getMedications: () => dispatch(fetchMedications()),
  getChart: () => dispatch(getChartThunk())
})

export default connect(mapState, mapDispatch)(Home)
