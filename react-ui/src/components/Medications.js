import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

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
                  <div key={medication.id} className="listItem">
                    <button
                      type="button"
                      onClick={() => this.handleSelect(medication)}
                    >
                      {medication.name}
                    </button>

                    <RemoveMedication medication={medication} remove={remove} />
                  </div>
                );
              })}
          </div>
          <button type="button" onClick={() => this.handleAdd()}>
            Add a Medication
          </button>
        </div>
        <div className="column">
          <div className="modal">
            {this.state.add && (
              <>
                <AddMedication />
                <button type="button" onClick={() => this.handleClose()}>
                  X
                </button>
              </>
            )}

            {this.state.selected && (
              <>
                <button type="button" onClick={() => this.handleClose()}>
                  X
                </button>

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
              </>
            )}
          </div>
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
