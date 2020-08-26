import React from "react";
import { connect } from "react-redux";
import { fetchMedication } from "../redux/singleMedication";
import UpdateMedication from "./UpdateMedication";

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
    console.log(this.props, "HERE");

    const medication = this.props.medication;
    const rxcui = this.props.rxcui;

    return (
      <div>
        {medication && (
          <div>
            <p>{medication.name}</p>
            <p>{medication.dosage}</p>
            <p>{medication.frequency}</p>
            <p>{rxcui}</p>
            <UpdateMedication medication={medication} />
          </div>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    medication: state.medication.medication,
    rxcui: state.medication.rxcui,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleMedication: (id) => dispatch(fetchMedication(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleMedication);
