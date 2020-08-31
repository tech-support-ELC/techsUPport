import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import { fetchMedications, deleteMedication } from "../redux/medications";
import AddMedication from "./AddMedication";
import RemoveMedication from "./RemoveMedication";
import SingleMedication from "./SingleMedication";

class Medications extends React.Component {
  constructor() {
    super();
    this.state = { selected: null, add: false };
    this.handleSelect = this.handleSelect.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    this.props.fetchMedications();
  }

  handleSelect(medication) {
    this.setState({ selected: medication, add: false });
  }

  handleAdd() {
    this.setState({ selected: null, add: true });
  }

  handleClose() {
    this.setState({ selected: null, add: false });
  }

  handleRemove(id) {
    this.props.remove(id);
    this.handleClose();
  }

  render() {
    const { medications, remove } = this.props;

    return (
      <div className="main">
        <div className="column">
          <h3>My Saved Medications</h3>
          <div className="scroll">
            {medications &&
              medications.map((medication) => {
                return (
                  <div className="listItem" key={medication.id}>
                    <>
                      <button
                        className="bigButton"
                        type="button"
                        onClick={() => this.handleSelect(medication)}
                      >
                        {medication.name}
                      </button>
                    </>
                    {/* <RemoveMedication medication={medication} remove={remove} /> */}
                  </div>
                );
              })}
          </div>
          <button type="button" onClick={() => this.handleAdd()}>
            Add a Medication
          </button>
          <ReactModal isOpen={this.state.add} contentLabel="Single Document">
            (
            <>
              <AddMedication />
              <button type="button" onClick={() => this.handleClose()}>
                Close
              </button>
            </>
            )
          </ReactModal>
          <ReactModal
            isOpen={this.state.selected}
            contentLabel="Single Document"
          >
            <SingleMedication
              selected={this.state.selected}
              remove={remove}
              // closeModal={this.handleClose}
            />

            <RemoveMedication
              medication={this.state.selected}
              remove={this.handleRemove}
              // close={this.handleClose}
            />
            <button type="button" onClick={() => this.handleClose()}>
              Close
            </button>
          </ReactModal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    medications: state.medications,
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMedications: () => dispatch(fetchMedications()),
    remove: (id) => dispatch(deleteMedication(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medications);
