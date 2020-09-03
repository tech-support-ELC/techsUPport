import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  updateTodayMedThunk
} from '../redux/dcTodayMed';
class UpdateTodayMed extends Component {
  constructor() {
    super();
    this.state = {
      notes: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault()
    const id = this.props.eachMed.id
    this.props.updateTodayMed(id, this.state)
    this.setState({
      notes: ''
    })
  }
  render() {
    const name = this.props.eachMed.name;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Update {name} Medication</h1>
        <div>
        <label>
        Any notes on how this medication is making you feel?
        <textarea
            className='textarea'
            placeholder='Notes'
            type='text'
            name='notes'
            onChange={this.handleChange}
            value={this.state.notes}
          />
        </label>
        </div>
        <br />
        <button type="submit">
          Submit
        </button>
      </form>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateTodayMed: (id, todayMed) => (dispatch(updateTodayMedThunk(id, todayMed)))
  }
}
export default connect(null, mapDispatchToProps)(UpdateTodayMed)
