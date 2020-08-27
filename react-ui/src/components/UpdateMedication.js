import React from "react";
import { connect } from "react-redux";
import { updateMedication } from "../redux/singleMedication";

export default class UpdateMedication extends React.Component {
  constructor() {
    super();
    this.state = { name: "", dosage: "", frequency: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const medication = this.props.medication;
    const updated = this.state;
    console.log("SUMBIT", medication, updated);
    this.props.update(medication, updated);

    this.props.close();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Updated Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Required"
          />

          <label htmlFor="dosage">Updated Dosage:</label>
          <input
            type="text"
            name="dosage"
            value={this.state.dosage}
            onChange={this.handleChange}
          />

          <label htmlFor="frequency">Updated Frequency:</label>
          <input
            type="text"
            name="frequency"
            value={this.state.frequency}
            onChange={this.handleChange}
          />

          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     update: (medication, updatedMedication) =>
//       dispatch(updateMedication(medication, updatedMedication)),
//   };
// };
