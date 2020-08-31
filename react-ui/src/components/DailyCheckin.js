import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScoreThunk, addScoreThunk } from '../redux/dcCondition';
import { addAppointmentThunk } from '../redux/dcDoctor';
import { getMedicationThunk, addMedicationThunk } from '../redux/dcMedication';
import DCMedicationForm from './DCMedicationForm';
import DCConditionForm from './DCConditionForm';
import DCDoctorForm from './DCDoctorForm';
import { getAllDoctorsThunk } from '../redux/doctors'
import ReactModal from 'react-modal';
import AddMedication from './AddMedication'
import { Link } from 'react-router-dom'
class DailyCheckin extends Component {
  constructor() {
    super();
    this.state = {
      showDocModal: false,
      showMedModal: false,
      showCondModal: false,
    };
    this.openDocModal = this.openDocModal.bind(this);
    this.openMedModal = this.openMedModal.bind(this);
    this.openCondModal = this.openCondModal.bind(this);
    this.closeDocModal = this.closeDocModal.bind(this);
    this.closeMedModal = this.closeMedModal.bind(this);
    this.closeCondModal = this.closeCondModal.bind(this);
  }
  componentDidMount() {
    this.props.getScore();
    this.props.getAllDoctors();
    this.props.getMedication();
    ReactModal.setAppElement('body');
  }
  openCondModal() {
    this.setState({ showCondModal: true });
    this.props.getScore();
  }
  openDocModal() {
    this.setState({ showDocModal: true });
    this.props.getAllDoctors();
  }
  openMedModal() {
    this.setState({ showMedModal: true });
    this.props.getMedication();
  }
  closeDocModal() {
    this.setState({ showDocModal: false });
  }
  closeCondModal() {
    this.setState({ showCondModal: false });
  }
  closeMedModal() {
    this.setState({ showMedModal: false });
  }
  addMedication() {

  }
  render() {
    const score = this.props.score;
    const doctors = this.props.doctors;
    const med = this.props.med;
    return (
      <div className="main" id="daily">
        <h1>Daily Check-in</h1>
          <div>
            <button
              className="bigButton"
              type="button"
              onClick={() => this.openCondModal()}
            >
              Conditions
            </button>
            <ReactModal
              isOpen={this.state.showCondModal}
              contentLabel="Single Document"
            >
            <div>
            {(score && score.length > 0) ?
              score.map((condition) => {
                return (
                  <div key={condition.id}>
                    <DCConditionForm
                      condition={condition}
                      addScore={this.props.addScore}
                    />
                  </div>
                );
              }) : "You don't have any conditions"}
              <div>
              {
                (score && score.length === 0) ? <Link to="/conditions">Add Condition</Link> : null
              }
              </div>
              </div>
              <button onClick={this.closeCondModal}>Done</button>
            </ReactModal>
          </div>
          <div>
            <button
              className="bigButton"
              type="button"
              onClick={() => this.openDocModal()}
            >
              Doctors
            </button>
            <ReactModal
              isOpen={this.state.showDocModal}
              contentLabel="Single Document"
            >
            <div>
            {
            (doctors && doctors.length>0) ?
            doctors.map((doctor) => {
              return (
                <div key={doctor.id}>
                  <DCDoctorForm
                    doctor={doctor}
                    addAppointment={this.props.addAppointment}
                  />
                </div>
              );
            }) : "You don't have any doctors"
            }
            </div>
            <div>
              {
                (doctors && doctors.length === 0) ? <Link to="/doctors">Add Doctor</Link> : null
              }
              </div>
            <button onClick={this.closeDocModal}>Done</button>
            </ReactModal>
          </div>
          <div>
            <button
              className="bigButton"
              type="button"
              onClick={() => this.openMedModal()}
            >
              Medications
            </button>
            <ReactModal
              isOpen={this.state.showMedModal}
              contentLabel="Single Document"
            >
            <div>
              {
                (med && med.length > 0) ? med.map((eachMed) => {
                  return (
                    <div key={eachMed.id}>
                      <DCMedicationForm
                        eachMed={eachMed}
                        addMedication={this.props.addMedication}
                      />
                    </div>
                  );
                }) : "You don't have any medications"
              }
            </div>
            <div>
              {
                (med && med.length === 0) ? <Link to="/medications">Add Medication</Link> : null
              }
              </div>
              <button onClick={this.closeMedModal}>Done</button>
            </ReactModal>
          </div>
          
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    score: state.score,
    appointment: state.appointment,
    doctors: state.doctors,
    med: state.med,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getScore: () => dispatch(getScoreThunk()),
    addScore: (score) => dispatch(addScoreThunk(score)),
    getAllDoctors: () => dispatch(getAllDoctorsThunk()),
    addAppointment: (appointment) => dispatch(addAppointmentThunk(appointment)),
    getMedication: () => dispatch(getMedicationThunk()),
    addMedication: (med) => dispatch(addMedicationThunk(med)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DailyCheckin);
