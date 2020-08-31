import React from 'react'
import { connect } from 'react-redux'
import { logout } from '../redux/auth'
import DoctorDonut from './datavis/doctor-appointment-donut'
import { getAppointmentThunk } from '../redux/dcDoctor'
import { getAllDoctorsThunk, addDoctorThunk } from '../redux/doctors'
import conditions, { getAllConditionsThunk, addConditionThunk } from '../redux/conditions'
import LineChart from './lineChart/LineChartCondition'
import medications from '../redux/medications'
import ReactModal from "react-modal"
import AddDoctor from '../components/AddDoctor'
import AddConditionForm from '../components/AddConditionForm'
import AddMedication from '../components/AddMedication'
import { fetchMedications } from "../redux/medications";
import { getChartThunk } from '../redux/score'


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
    const { handleClick } = this.props
    const appointments = this.props.appointment
    const doctors = this.props.doctors
    const conditions = this.props.conditions
    const medications = this.props.medications
    const chart = this.props.chart
    return (
      <div>
        <h1>Welcome {firstName}!</h1>
        <p>
          <button type='submit' onClick={handleClick}>Log out</button>
        </p>
        <div>
          {
            (doctors.length === 0 || conditions.length === 0 || medications.length === 0) ?
              (
                <div>
                  <h2>Get started by adding your doctors, conditions, and medications</h2>
                  <div>
                    <button onClick={this.openDoctorModal}>Add a Doctor</button>
                    <ReactModal isOpen={this.state.showDoctorModal} contentLabel="Example Modal">
                      <AddDoctor
                        currentUser={this.props.currentUser}
                        addNewDoctor={this.props.addNewDoctor}
                      />
                      <button onClick={this.closeDoctorModal}>Close</button>
                    </ReactModal>
                  </div>

                  <div>
                    <button type="button" onClick={this.openMedicineModal}>Add a Medication</button>
                    <ReactModal isOpen={this.state.showMedicineModal} contentLabel="Single Document">
                      <>
                        <AddMedication />
                        <button type="button" onClick={this.closeMedicineModal}>Close</button>
                      </>
                    </ReactModal>
                  </div>

                  <div>
                    <button onClick={this.openConditionModal}>Add a Condition</button>
                    <ReactModal isOpen={this.state.showConditionModal} contentLabel="Single Document">
                      <AddConditionForm
                        currentUser={this.props.currentUser}
                        addCondition={this.props.addCondition}
                      />
                      <button onClick={this.closeConditionModal}>close</button>
                    </ReactModal>
                  </div>

                </div>
              )
              : (doctors && doctors.length > 0 && appointments && appointments.length > 0) ?
                <DoctorDonut appointment={appointments} doctors={doctors} /> :
                (chart && chart.length > 0) ?
                  <LineChart />
                  : null
          }
        </div>
        <div>
          {

          }
        </div>
        <div>
          {
          }
        </div>

      </div >
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

const mapDispatch = (dispatch, ownProps) => ({
  handleClick: () => {
    dispatch(logout(ownProps.history))
  },
  getAllDoctors: () => dispatch(getAllDoctorsThunk()),
  getAppointments: () => dispatch(getAppointmentThunk()),
  getAllConditions: () => dispatch(getAllConditionsThunk()),
  addCondition: (condition) => dispatch(addConditionThunk(condition)),
  addNewDoctor: (newDoctor) => dispatch(addDoctorThunk(newDoctor)),
  getMedications: () => dispatch(fetchMedications()),
  getChart: () => dispatch(getChartThunk())
})

export default connect(mapState, mapDispatch)(Home)