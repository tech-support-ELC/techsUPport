import React, {Component} from 'react';
class AddConditionForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      diagnosed: '',
      typeOfPain: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addCondition(this.state);
    this.setState = {
      name: '',
      diagnosed: '',
      typeOfPain: '',
    }
  }
  render() {
    return (
      <div>
        <h1>Add new condition</h1>
        <div>
          <input
            className='input'
            placeholder='Condition name'
            type='text'
            name='name'
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>
        <div>
          <input
            className='input'
            placeholder='Is diagnosed?'
            type='text'
            name='diagnosed'
            onChange={this.handleChange}
            value={this.state.diagnosed}
          />
        </div>
        <div>
          <input
            className='input'
            placeholder='typeOfPain'
            type='text'
            name='typeOfPain'
            onChange={this.handleChange}
            value={this.state.typeOfPain}
          />
        </div>
      </div>
    )
  }
}
