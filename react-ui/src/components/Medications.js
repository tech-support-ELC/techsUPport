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
  }
  componentDidMount() {
    this.props.fetchMedications();
  }

  handleSelect(medication) {
    this.setState({ selected: medication });
  }

  handleAdd() {
    this.setState({ add: true });
  }

  handleClose() {
    this.setState({ selected: null, add: false });
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
                    {/* <p onClick={this.handleSelect(medication)}> */}
                    {/* <Link to={`/medications/${medication.id}`}>
                      {medication.name}
                    </Link> */}

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
                <SingleMedication medication={this.state.selected} />
                <button type="button" onClick={() => this.handleClose()}>
                  X
                </button>
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
