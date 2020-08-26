import React from "react";
import { connect } from "react-redux";
import { addMedication } from "../redux/medications";

class AddMedication extends React.Component {
  constructor() {
    super();
    this.state = { name: "", dosage: "", frequency: "", userId: 0 };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {}

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

          <label htmlFor="frequency">Frequency:</label>
          <input
            type="text"
            name="frequency"
            value={this.state.frequency}
            onChange={this.handleChange}
          />

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
