import React from "react";
import { connect } from "react-redux";

import { fetchMedications, deleteMedication } from "../redux/medications";
import AddMedication from "./AddMedication";
import RemoveMedication from "./RemoveMedication";
import SingleMedication from "./SingleMedication";

class Medications extends React.Component {
  constructor() {
    super();
    this.state = { selected: "" };
    this.handleSelect = this.handleSelect.bind(this);
  }
  componentDidMount() {
    this.props.fetchMedications();
  }

  handleSelect(medication) {
    this.setState({ selected: medication });
  }

  render() {
    const medications = this.props.medications;
    return (
      <div>
        <h1>All medications</h1>
        <div>
          {medications &&
            medications.map((medication) => {
              return (
                <div key={medication.id}>
                  <p onClick={this.handleSelect(medication)}>
                    {medication.name}
                  </p>

                  <RemoveMedication
                    medication={medication}
                    remove={deleteMedication}
                  />
                </div>
              );
            })}
          <div>
            <AddMedication />
          </div>
          <div>
            <SingleMedication medication={this.state.selected} />
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    medications: state.medications,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchMedications: () => dispatch(fetchMedications()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Medications);
