import React from "react";

export default class UpdateMedication extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      dosage: 0,
      dosageUnit: "",
      frequency: 0,
      frequencyUnit: "",
    };
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
      <form onSubmit={this.handleSubmit}>
        <label htmlFor="name">Updated Name:</label>
        <input
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder={this.props.medication.name}
        />

        <label htmlFor="dosage">Updated Dosage:</label>
        <input
          type="text"
          name="dosage"
          value={this.state.dosage}
          onChange={this.handleChange}
          placeholder={this.props.medication.dosage || "Dosage"}
        />
        <select
          onChange={this.handleChange}
          value={this.state.dosageUnit}
          name="dosageUnit"
        >
          <option value=""></option>
          <option value="g">g</option>
          <option value="mg">mg</option>
          <option value="mg/kg">mg/kg</option>
          <option value="mL">mL</option>
          <option value="pills">pills</option>
          <option value="capsules">capsules</option>
          <option value="tablets">tablets</option>
          <option value="drops">drops</option>
        </select>

        <label htmlFor="frequency">
          Updated Frequency:
          <input
            type="text"
            name="frequency"
            value={this.state.frequency}
            onChange={this.handleChange}
            placeholder={this.props.medication.frequency || "Frequency"}
          />
          <select
            onChange={this.handleChange}
            value={this.state.frequencyUnit}
            name="frequencyUnit"
          >
            <option value=""></option>
            <option value="day">day</option>
            <option value="hour">hour</option>
            <option value="week">week</option>
            <option value="as needed">as needed</option>
          </select>
        </label>

        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
    );
  }
}

// const mapDispatch = (dispatch) => {
//   return {
//     update: (medication, updatedMedication) =>
//       dispatch(updateMedication(medication, updatedMedication)),
//   };
// };
