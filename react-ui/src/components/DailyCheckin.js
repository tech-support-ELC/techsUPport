import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getScoreThunk, addScoreThunk } from '../redux/dailyCheckin';


export class DailyCheckin extends Component {
  constructor() {
    super();
    this.state = {
      value: 0,
      date: new Date(),
      notes: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.log('props in daily checkin', this.props)
    this.props.getScore();
  }
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }
  handleSubmit(evt) {
    evt.preventDefault();
    this.props.addScore(this.state);
    this.setState({
      value: 0,
      date: new Date(),
      notes: ''
    })
  }
  render() {
    const score = this.props.score;

    return (
      <div>
        <h1>Daily checkin</h1>
        <h3>Conditions</h3>
        {
          score && score.map(condition => {
            return (
              <div key={condition.id}>
                {condition.name}
              </div>
            )
          })
        }
        <form onSubmit={this.handleSubmit}>
          <div>
            <input
              className='input'
              placeholder='Give score for condition'
              type='text'
              name='value'
              onChange={this.handleChange}
              value={this.state.value}
            />
          </div>
          <div>
            <input
              className='input'
              placeholder='Date'
              type='text'
              name='date'
              onChange={this.handleChange}
              value={this.state.date}
            />
          </div>
          <div>
            <input
              className='input'
              placeholder='Notes'
              type='text'
              name='notes'
              onChange={this.handleChange}
              value={this.state.notes}
            />
          </div>
          <button type="submit">
            Submit
          </button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    score: state.score,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getScore: () => dispatch(getScoreThunk()),
    addScore: (score) => dispatch(addScoreThunk(score))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DailyCheckin)
