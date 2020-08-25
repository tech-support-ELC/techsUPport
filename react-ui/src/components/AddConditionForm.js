import React, { Component } from "react";
class AddConditionForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      diagnosed: "",
      typeOfPain: "",
      userId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const userId = this.props.currentUser.id;

    this.setState({ [evt.target.name]: evt.target.value, userId });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addCondition(this.state);
    this.setState = {
      name: "",
      diagnosed: "",
      typeOfPain: "",
      userId: 0,
    };
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Add new condition form</h1>
          <div>
            <input
              className="input"
              placeholder="Condition name"
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Is diagnosed?(true/false)"
              type="text"
              name="diagnosed"
              onChange={this.handleChange}
              value={this.state.diagnosed}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Type of pain"
              type="text"
              name="typeOfPain"
              onChange={this.handleChange}
              value={this.state.typeOfPain}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default AddConditionForm;
