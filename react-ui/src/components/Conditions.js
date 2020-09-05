import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllConditionsThunk, addConditionThunk } from "../redux/conditions";
import { getSingleConditionThunk } from "../redux/singleCondition";
import AddConditionForm from "./AddConditionForm";
import SingleCondition from "./SingleCondition";
import ReactModal from "react-modal";

// const customStyles = {
//   content: {
//     top: '50%',
//     left: '50%',
//     right: 'auto',
//     bottom: 'auto',
//     marginRight: '-50%',
//     transform: 'translate(-50%, -50%)'
//   }
// };
class Conditions extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showCondModal: false,
    };
    this.openModal = this.openModal.bind(this);
    this.openCondModal = this.openCondModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.closeCondModal = this.closeCondModal.bind(this);
  }
  componentDidMount() {
    this.props.getAllConditions();
    ReactModal.setAppElement("body");
  }
  openModal() {
    this.setState({ showModal: true });
  }

  openCondModal(id) {
    this.setState({ showCondModal: true });
    this.props.getSingleCondition(id);
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  closeCondModal() {
    this.setState({ showCondModal: false });
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
                      onClick={() => this.openCondModal(condition.id)}
                    >
                      {condition.name}
                    </button>
                    <ReactModal
                      isOpen={this.state.showCondModal}
                      contentLabel="Single Document"
                      className="popup"
                    >
                      <button className="close" onClick={this.closeCondModal}>
                        X
                      </button>
                      <SingleCondition closeTheModal={this.closeCondModal} />
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
            className="popup"
          >
            <button className="close" onClick={this.closeModal}>
              X
            </button>
            <AddConditionForm
              close={this.closeModal}
              currentUser={this.props.currentUser}
              addCondition={this.props.addCondition}
            />
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
