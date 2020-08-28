import React, { Component } from 'react';
class DCMedicationForm extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      notes: '',
      medicationId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const medicationId = this.props.eachMed.id;
    this.setState({ medicationId });
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addMedication(this.state);
    this.setState({
      isClicked: false,
      notes: '',
      conditionId: 0
    })
  }
  render() {
    const med = this.props.eachMed;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {med.name}
          <input
            type='checkbox'
            name='isClicked'
            onChange={this.handleChange}
          />
        </label>
        {
          this.state.isClicked ?
            <div>
              <div>
                <label>
                  Any notes on how this medication is making you feel?
            <input
                    className='input'
                    placeholder='notes'
                    type='text'
                    name='notes'
                    onChange={this.handleChange}
                    value={this.state.notes}
                  />
                </label>
              </div>
              <button type="submit">
                Submit
          </button>
            </div> : null
        }

      </form>
    )
  }
}
export default DCMedicationForm;
