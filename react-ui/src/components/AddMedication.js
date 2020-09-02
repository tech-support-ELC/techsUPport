import React from "react";
import { connect } from "react-redux";
import { addMedication } from "../redux/medications";

class AddMedication extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      dosage: 0,
      dosageUnit: "",
      frequency: 0,
      frequencyUnit: "",
      userId: 0,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const currentUser = this.props.currentUser.id;
    this.setState({ userId: currentUser });
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addMedication(this.state);
    this.setState({ name: "", dosage: "", frequency: "", userId: 0 });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="name">Medication Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            placeholder="Required"
          />

          <label htmlFor="dosage">Dosage:</label>
          <input
            type="text"
            name="dosage"
            value={this.state.dosage}
            onChange={this.handleChange}
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

          <label htmlFor="frequency">Frequency:</label>
          <input
            type="text"
            name="frequency"
            value={this.state.frequency}
            onChange={this.handleChange}
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

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    currentUser: state.currentUser,
  };
};

const mapDispatch = (dispatch) => {
  return { addMedication: (medication) => dispatch(addMedication(medication)) };
};

export default connect(mapState, mapDispatch)(AddMedication);
