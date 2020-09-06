import React from "react";
import { connect } from "react-redux";
import { fetchMedication, updateMedication } from "../redux/singleMedication";
import { deleteMedication } from "../redux/medications";
import UpdateMedication from "./UpdateMedication";

export class SingleMedication extends React.Component {
  constructor() {
    super();
    this.state = { update: false };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  componentDidMount() {
    try {
      const id = this.props.selected.id || this.props.medication;
      this.props.loadSingleMedication(id);
    } catch (err) {
      console.log(err);
    }
  }

  handleClose() {
    this.setState({ update: false });
  }

  handleOpen() {
    this.setState({ update: true });
  }

  handleUpdate(medication, updatedMedication) {
    this.props.update(medication, updatedMedication);
  }

  async handleDelete(id) {
    try {
      await this.props.delete(id);
      this.props.close();
    } catch (err) {
      console.log(err);
    }
  }

  render() {
    const medication = this.props.selected;

    const rxcui = this.props.rxcui;

    return (
      <div>
        {medication && !this.state.update && (
          <div>
            <p>{medication.name}</p>
            <p>
              {medication.dosage} {medication.dosageUnit}
            </p>
            <p>
              {medication.frequency} / {medication.frequencyUnit}
            </p>
            <p>{rxcui}</p>
            <div className="buttons">
              <button type="button" onClick={() => this.handleOpen()}>
                Update
              </button>
              <button
                type="button"
                onClick={() => this.handleDelete(medication.id)}
              >
                Delete
              </button>
            </div>
          </div>
        )}
        {medication && this.state.update && (
          <div>
            <UpdateMedication
              medication={medication}
              close={this.props.close}
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
    delete: (id) => dispatch(deleteMedication(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleMedication);
