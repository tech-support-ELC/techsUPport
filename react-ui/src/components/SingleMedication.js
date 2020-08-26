import React from "react";
import { connect } from "react-redux";
import { fetchMedication } from "../redux/singleMedication";
import UpdateMedication from "./UpdateMedication";

export class SingleMedication extends React.Component {
  constructor() {
    super();
    this.state = { view: true, update: false };

    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleClose = this.handleClose.bind(this);
    // this.handleRemove = this.handleRemove.bind(this);
  }
  componentDidMount() {
    try {
      const id = this.props.medication.id;
      this.props.loadSingleMedication(id);
    } catch (err) {
      console.log(err);
    }
  }

  handleClose() {
    this.setState({ update: false });
  }

  handleUpdate() {
    this.setState({ update: true });
  }

  // handleRemove() {
  //   this.setState({ view: false });

  // }

  render() {
    const medication = this.props.medication;
    const rxcui = this.props.rxcui;

    return (
      <div>
        {this.state.view && (
          <>
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
                <button type="button" onClick={() => this.handleUpdate()}>
                  Update Medication Info
                </button>
              </div>
            )}
            {medication && this.state.update && (
              <div>
                <UpdateMedication medication={medication} />
                <button type="button" onClick={() => this.handleClose()}>
                  Cancel Update
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    // medication: state.medication.medication,
    rxcui: state.medication.rxcui,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadSingleMedication: (id) => dispatch(fetchMedication(id)),
  };
};

export default connect(mapState, mapDispatch)(SingleMedication);
