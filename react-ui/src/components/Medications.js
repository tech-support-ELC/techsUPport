import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { fetchMedications, deleteMedication } from "../redux/medications";
import AddMedication from "./AddMedication";
import RemoveMedication from "./RemoveMedication";
import SingleMedication from "./SingleMedication";

class Medications extends React.Component {
  // constructor() {
  //   super();
  //   this.state = { selected: "" };
  //   this.handleSelect = this.handleSelect.bind(this);
  // }
  componentDidMount() {
    this.props.fetchMedications();
  }

  // handleSelect(medication) {
  //   this.setState({ selected: medication });
  // }

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
                    {/* <p onClick={this.handleSelect(medication)}> */}
                    <Link to={`/medications/${medication.id}`}>
                      {medication.name}
                    </Link>

                    <RemoveMedication medication={medication} remove={remove} />
                  </div>
                );
              })}
          </div>
        </div>
        <div className="column">
          <div className="modal">
            <AddMedication />
          </div>
          {/* <SingleMedication medication={this.state.selected} /> */}
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
