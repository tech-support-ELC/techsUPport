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
      const id = this.props.selected.id;
      this.props.loadSingleMedication(id);
    } catch (err) {
      console.log(err);
    }
  }

  handleCancel() {
    this.setState({ update: false });
  }
  handleClose(id) {
    // this.props.loadSingleMedication(id);
    this.setState({ update: false });
  }

  handleOpen() {
    this.setState({ update: true });
  }

  handleUpdate(medication, updatedMedication) {
    this.props.update(medication, updatedMedication);
  }
  // handleReload(id) {
  //   this.props.loadSingleMedication(id);
  // }

  // handleRemove() {
  //   this.setState({ view: false });

  // }

  render() {
    const medication = this.props.medication;
    const rxcui = this.props.rxcui;

    return (
      <div>
        {/* {this.state.view && (
          <> */}
        {medication && !this.state.update && (
          <div>
            <p>{medication.name}</p>
            <p>{medication.dosage}</p>
            <p>{medication.frequency}</p>
            <p>{rxcui}</p>
            {/*
                <RemoveMedication
                  medication={medication}
                  remove={this.props.remove}
                /> */}
            <button type="button" onClick={() => this.handleOpen()}>
              Update Medication Info
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
            <button type="button" onClick={() => this.handleCancel()}>
              Cancel Update
            </button>
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
