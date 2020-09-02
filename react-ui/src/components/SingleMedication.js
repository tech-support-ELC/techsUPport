import React from "react";
import { connect } from "react-redux";
import { fetchMedication, updateMedication } from "../redux/singleMedication";
import UpdateMedication from "./UpdateMedication";

export class SingleMedication extends React.Component {
  constructor() {
    super();
    this.state = { update: false };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    try {
      const id = this.props.selected.id || this.props.medication;
      this.props.loadSingleMedication(id);
    } catch (err) {
      console.log(err);
    }
  }

  handleClose(id) {
    this.setState({ update: false });
  }

  handleOpen() {
    this.setState({ update: true });
  }

  handleUpdate(medication, updatedMedication) {
    this.props.update(medication, updatedMedication);
  }

  render() {
    const medication = this.props.medication;
    const rxcui = this.props.rxcui;

    return (
      <div>
        {medication && !this.state.update && (
          <div>
            <p>{medication.name}</p>
            <p>{medication.dosage}</p>
            <p>{medication.frequency}</p>
            <p>{rxcui}</p>

            <button type="button" onClick={() => this.handleOpen()}>
              Update
            </button>
          </div>
        )}
        {medication && this.state.update && (
          <div>
            <UpdateMedication
              medication={medication}
              close={this.handleClose}
              update={this.handleUpdate}
            />
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
    update: (medication, updatedMedication) =>
      dispatch(updateMedication(medication, updatedMedication)),
  };
};

export default connect(mapState, mapDispatch)(SingleMedication);
