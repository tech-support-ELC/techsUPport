import React, { Component } from "react";
import { toast } from "react-toastify";
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
    const condition = this.state.name;
    this.props.addCondition(this.state);
    this.setState({
      name: "",
      diagnosed: "",
      typeOfPain: "",
      userId: 0,
    });
    toast(`${condition} added!`);
    this.props.close();
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
            <label>
              Is it diagnosed?
              <select
                onChange={this.handleChange}
                value={this.state.diagnosed}
                name="diagnosed"
              >
                <option value=""></option>
                <option value="yes">yes</option>
                <option value="no">no</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Type of pain?
              <select
                onChange={this.handleChange}
                value={this.state.typeOfPain}
                name="typeOfPain"
              >
                <option value=""></option>
                <option value="mental health">mental health</option>
                <option value="physical">physical</option>
              </select>
            </label>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
export default AddConditionForm;
