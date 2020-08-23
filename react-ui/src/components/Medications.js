import React from "react";
import { connect } from "react-redux";
import { fetchMedications } from "../redux/medications";

class Medications extends React.Component {
  componentDidMount() {
    this.props.fetchMedications();
  }
  render() {
    const medications = this.props.medications;
    return (
      <div>
        <h1>All medications</h1>
        <div>
          {medications &&
            medications.map((medication) => {
              return <div>{medication.name}</div>;
            })}
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
