import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
  updateTodayScoreThunk
} from '../redux/dcTodayScore';
class UpdateTodayScore extends Component {
  constructor() {
    super();
    this.state = {
      rate: '',
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
    const id = this.props.eachScore.id
    this.props.updateTodayScore(id, this.state)
    this.setState({
      rate: '',
      notes: ''
    })
  }
  render() {
    const name = this.props.eachScore.name;
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Update {name} Condition</h1>
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
        <br />

        <div>
        <label>
          Notes on how I feel:
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
    updateTodayScore: (id, todayScore) => (dispatch(updateTodayScoreThunk(id, todayScore)))
  }
}
export default connect(null, mapDispatchToProps)(UpdateTodayScore)
