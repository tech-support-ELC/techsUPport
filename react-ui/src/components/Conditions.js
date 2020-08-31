import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllConditionsThunk, addConditionThunk } from '../redux/conditions';
import {getSingleConditionThunk} from '../redux/singleCondition';
import AddConditionForm from './AddConditionForm';
import SingleCondition from './SingleCondition';
import ReactModal from 'react-modal';
class Conditions extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDocModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.openDocModal = this.openDocModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeDocModal = this.closeDocModal.bind(this);
  }
  componentDidMount() {
    this.props.getAllConditions();
    ReactModal.setAppElement('body');
  }
  openModal() {
    this.setState({ showModal: true });
  }

  openDocModal(id) {
    this.setState({ showDocModal: true });
    this.props.getSingleCondition(id);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeDocModal() {
    this.setState({ showDocModal: false });
  }
  render() {
    const conditions = this.props.conditions;
    return (
      <div className="main">
        <div className="column">
          <h3>My Conditions</h3>
          <div className="scroll">
            {conditions &&
              conditions.map((condition) => {
                return (
                  <div className="listItem" key={condition.id}>
                    <button
                      className="bigButton"
                      type="button"
                      onClick={() => this.openDocModal(condition.id)}
                    >
                      {condition.name}
                    </button>
                    <ReactModal
                      isOpen={this.state.showDocModal}
                      contentLabel="Single Document"
                    >
                      <SingleCondition closeTheModal={this.closeDocModal} />
                      <button onClick={this.closeDocModal}>Close</button>
                    </ReactModal>
                  </div>
                );
              })}
          </div>

          <button onClick={this.openModal}>Add a Condition</button>
        </div>
        <div>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Single Document"
          >
            <AddConditionForm
              currentUser={this.props.currentUser}
              addCondition={this.props.addCondition}
            />
            <button onClick={this.closeModal}>close</button>
          </ReactModal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    conditions: state.conditions,
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllConditions: () => dispatch(getAllConditionsThunk()),
    addCondition: (condition) => dispatch(addConditionThunk(condition)),
    getSingleCondition: (id) => dispatch(getSingleConditionThunk(id)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Conditions);
