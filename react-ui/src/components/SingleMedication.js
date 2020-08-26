import React from "react";
import { connect } from "react-redux";
import { fetchMedication } from "../redux/singleMedication";

export class SingleMedication extends React.Component {
  componentDidMount() {
    try {
      const id = this.props.match.params.id;
      this.props.loadSingleMedication(id);
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

const mapState = (state) => {
  return {
    medication: state.medication,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleMedication: (id) => dispatch(fetchMedication(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleMedication);
