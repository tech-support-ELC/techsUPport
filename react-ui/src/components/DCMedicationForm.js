import React, { Component } from "react";

import { toast } from "react-toastify";

class DCMedicationForm extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      notes: "",
      medicationId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.notify = this.notify.bind(this);
  }

  // notify() {
  //   toast("Medication check-in successful!");
  // }

  handleChange(evt) {
    const medicationId = this.props.eachMed.id;
    this.setState({ medicationId });
    const target = evt.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    const med = this.props.eachMed.name;
    this.props.addMedication(this.state);
    this.setState({
      isClicked: false,
      notes: "",
      conditionId: 0,
    });
    toast(`Check-in for ${med} successful!`);
  }
  render() {
    const med = this.props.eachMed;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            {med.name}
            <input
              type="checkbox"
              name="isClicked"
              onChange={this.handleChange}
            />
          </label>
          {this.state.isClicked ? (
            <div>
              <div>
                <label>
                  Any notes on how this medication is making you feel?
                  <textarea
                    className="textarea"
                    placeholder="notes"
                    type="text"
                    name="notes"
                    onChange={this.handleChange}
                    value={this.state.notes}
                  />
                </label>
              </div>
              <button type="submit">Submit</button>
            </div>
          ) : null}
        </form>
      </div>
    );
  }
}
export default DCMedicationForm;
