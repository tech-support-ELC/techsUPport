import React, { Component } from 'react';
import { connect } from 'react-redux';
import DCSingleTodayScore from './DCSingleTodayScore';
import { getTodayScoreThunk } from '../redux/dcTodayScore';
import { getTodayAppointmentThunk } from'../redux/dcTodayAppointment';
import { getTodayMedsThunk } from '../redux/dcTodayMed';
import { getSingleTodayScoreThunk } from '../redux/dcSingleScore';
import { getSingleTodayAppointmentThunk } from '../redux/dcSingleAppointment';
import DCSingleTodayAppointment from './DCSingleTodayAppointment';
import { getSingleTodayMedsThunk } from '../redux/dcSingleMed';
import DCSingleTodayMed from './DCSingleTodayMed';
import ReactModal from "react-modal";
class DCSummary extends Component {
  constructor() {
    super();
    this.state = {
      showCondModal: false,
      showDocModal: false,
      showMedModal: false,
    };
    this.openCondModal = this.openCondModal.bind(this);
    this.closeCondModal = this.closeCondModal.bind(this);
    this.closeDocModal = this.closeDocModal.bind(this);
    this.closeMedModal = this.closeMedModal.bind(this);
    this.openDocModal = this.openDocModal.bind(this);
    this.openMedModal = this.openMedModal.bind(this);
  }
  componentDidMount() {
    this.props.getTodayScore();
    this.props.getTodayMeds();
    this.props.getTodayAppointment();
    ReactModal.setAppElement("body");
  }
  openDocModal(id) {
    this.setState({ showDocModal: true });
    this.props.getSingleTodayAppointment(id);
  }

  openCondModal(id) {
    this.setState({ showCondModal: true });
    this.props.getSingleTodayScore(id);
  }
  openMedModal(id) {
    this.setState({ showMedModal: true });
    this.props.getSingleTodayMeds(id);
  }

  closeMedModal() {
    this.setState({ showMedModal: false });
  }

  closeDocModal() {
    this.setState({ showDocModal: false });
  }

  closeCondModal() {
    this.setState({ showCondModal: false });
  }
  render() {
    const todayScore = this.props.todayScore;
    const todayAppointment = this.props.todayAppointment;
    const todayMed = this.props.todayMed;
    console.log(todayScore)
    return (
      <div>
        Today's summary:
        <div>
          <div>
          {
            todayScore.length > 0 ? "Your Conditions and Rate:" : null
          }
          </div>
          {
          (todayScore && todayScore.length > 0) && todayScore.map((eachScore) => {
            return (
              <div key={eachScore.id}>
                <button type="button"
                  onClick={() => this.openCondModal(eachScore.id)}>
                 {eachScore.name}
                 {' '}
                 {eachScore.rate}
                </button>
                <ReactModal
                  isOpen={this.state.showCondModal}
                  contentLabel="Single Document"
                  className="popup"
                >
                  <DCSingleTodayScore closeTheModal={this.closeCondModal} />
                  <button onClick={this.closeCondModal}>Close</button>
                </ReactModal>
              </div>
            );
          })
          }
        </div>
        <div>
          <div>
          {
            todayAppointment.length > 0 ? "Your Appointments:" : null
          }
          </div>
        {
          (todayAppointment && todayAppointment.length > 0) &&todayAppointment.map((eachAppointment) => {
            return (
              <div key={eachAppointment.id}>
                <button type="button"
                  onClick={() => this.openDocModal(eachAppointment.id)}>
                 {eachAppointment.firstName}
                 {' '}
                 {eachAppointment.lastName}
                 {' '}
                 {eachAppointment.time.slice(0,5)}
                </button>
                <ReactModal
                  isOpen={this.state.showDocModal}
                  contentLabel="Single Document"
                  className="popup"
                >
                  <DCSingleTodayAppointment closeTheModal={this.closeDocModal} />
                  <button onClick={this.closeDocModal}>Close</button>
                </ReactModal>
              </div>
            );
          })
          }
        </div>
        <div>
          <div>
          {
            todayMed.length > 0 ? "Your Medications:" : null
          }
          </div>
          {
          (todayMed && todayMed.length > 0) && todayMed.map((eachMed) => {
            return (
              <div key={eachMed.id}>
                <button type="button"
                  onClick={() => this.openMedModal(eachMed.id)}>
                 {eachMed.name}
                 {' '}
                 {eachMed.notes}
                </button>
                <ReactModal
                  isOpen={this.state.showMedModal}
                  contentLabel="Single Document"
                  className="popup"
                >
                  <DCSingleTodayMed closeTheModal={this.closeMedModal} />
                  <button onClick={this.closeMedModal}>Close</button>
                </ReactModal>
              </div>
            );
          })
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    todayScore: state.todayScore,
    todayAppointment: state.todayAppointment,
    todayMed: state.todayMed
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getTodayScore: () => dispatch(getTodayScoreThunk()),
    getTodayAppointment: () => dispatch(getTodayAppointmentThunk()),
    getTodayMeds: () => dispatch(getTodayMedsThunk()),
    getSingleTodayScore: (id) => dispatch(getSingleTodayScoreThunk(id)),
    getSingleTodayAppointment: (id) => dispatch(getSingleTodayAppointmentThunk(id)),
    getSingleTodayMeds: (id) => dispatch(getSingleTodayMedsThunk(id))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(DCSummary);

