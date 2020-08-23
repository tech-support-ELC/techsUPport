import React from "react";
import { connect } from "react-redux";
import { fetchMedication } from "../redux/singleMedication";

export class SingleMedication extends React.Component {
  componentDidMount() {
    try {
      this.props.loadSingleMedication(this.props.medication.id);
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const medication = this.props.medication;
    return (
      <div>
        <p>{medication.name}</p>
        <p>{medication.dosage}</p>
        <p>{medication.frequency}</p>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadSingleMedication: (id) => dispatch(fetchMedication(id)),
  };
};

export default connect(null, mapDispatch)(SingleMedication);
