import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllConditionsThunk, addConditionThunk } from '../redux/conditions';
import {getSingleConditionThunk} from '../redux/singleCondition';
import AddConditionForm from './AddConditionForm';
import SingleCondition from './SingleCondition';
import ReactModal from 'react-modal';
const customStyles = {
  content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)'
  }
};
class Conditions extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showDocModal: false
    }
      this.openModal = this.openModal.bind(this)
      this.openDocModal = this.openDocModal.bind(this)
      this.closeModal = this.closeModal.bind(this)
      this.closeDocModal = this.closeDocModal.bind(this)
  }
  componentDidMount() {
    this.props.getAllConditions();
  }
  openModal() {
    this.setState({ showModal: true })
  }

  openDocModal(id) {
      this.setState({ showDocModal: true })
      this.props.getSingleCondition(id)
  }

  closeModal() {
      this.setState({ showModal: false })
  }

  closeDocModal() {
      this.setState({ showDocModal: false })
  }
  render() {
    const conditions = this.props.conditions;
    return (
      <div>
        <h1>All conditions</h1>
        <button onClick={this.openModal}>Add a Condition</button>
        <div>
          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="Example Modal"
          >
            <AddConditionForm currentUser={this.props.currentUser} addCondition={this.props.addCondition} />
            <button onClick={this.closeModal}>close</button>
          </ReactModal>
          </div>
          <div>
            {conditions && conditions.map((condition) => {
              return (
                <div key={condition.id}>
                  <button onClick={() => this.openDocModal(condition.id)}>{condition.name}</button>
                  <ReactModal
                    isOpen={this.state.showDocModal}
                    contentLabel="Example Modal"
                  >
                    <SingleCondition closeTheModal={this.closeDocModal} />
                    <button onClick={this.closeDocModal}>close</button>
                  </ReactModal>
                </div>
              )
            })}
          </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    conditions: state.conditions,
    currentUser: state.currentUser,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllConditions: () => dispatch(getAllConditionsThunk()),
    addCondition: (condition) => dispatch(addConditionThunk(condition)),
    getSingleCondition: (id) => dispatch(getSingleConditionThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Conditions)
