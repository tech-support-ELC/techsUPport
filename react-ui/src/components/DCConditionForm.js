import React, {Component} from 'react';
class DCConditionForm extends Component {
  constructor() {
    super();
    this.state = {
      isClicked: false,
      name: '',
      rate: '',
      date: new Date(),
      notes: '',
      conditionId: 0
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    const conditionId = this.props.condition.id;
    this.setState({conditionId});
    const target = evt.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    console.log(target.checked)
    const name = target.name;
    this.setState({
      [name]: value
    });
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addScore(this.state);
    console.log('state in DC',this.state)
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
            Give score for condition from 1 to 10
            <input
              className='input'
              placeholder='1-10'
              type='text'
              name='rate'
              onChange={this.handleChange}
              value={this.state.rate}
            />
          </label>
        </div>
        <div>
          <label>
            Date
          <input
            className='input'
            placeholder='Date'
            type='text'
            name='date'
            onChange={this.handleChange}
            value={this.state.date}
          />
          </label>
        </div>
        <div>
          <label>
            Add some notes
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
