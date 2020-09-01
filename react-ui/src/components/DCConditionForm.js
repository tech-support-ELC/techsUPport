import React, { Component } from 'react';
class DCConditionForm extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      name: '',
      rate: '',
      date: new Date(),
      notes: '',
      conditionId: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const conditionId = this.props.condition.id;
    this.setState({ conditionId });
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addScore(this.state);
    this.setState({
      isClicked: false,
      name: '',
      rate: '',
      date: '',
      notes: '',
      conditionId: 0
    })
  }
  render() {
    const condition = this.props.condition;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          {condition.name}
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
                  How much is this affecting you today? 1 (not too much) to 10 (so very much):
                  <select onChange={this.handleChange}
                    value={this.state.rate} name="rate">
                      <option value=""></option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                      <option value="9">9</option>
                      <option value="10">10</option>
                  </select>
                </label>
              </div>
              <div>
                <label>
                  Notes on how I feel:
            <input
                    className='input'
                    placeholder='Notes'
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
export default DCConditionForm;
