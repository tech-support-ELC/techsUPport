import React from "react";
import { connect } from "react-redux";

class NewProduct extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addMdication(this.state);
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

          <br />
          <br />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return { addProduct: (product) => dispatch(addProduct(product)) };
};

export default connect(mapState, mapDispatch)(NewProduct);
