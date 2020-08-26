import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getScoreThunk, addScoreThunk} from '../redux/dailyCheckin';
import DCConditionForm from './DCConditionForm';
class DailyCheckin extends Component {
  componentDidMount() {
    this.props.getScore();
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
                <DCConditionForm condition={condition} addScore={this.props.addScore}/>
            </div>
            )
          })
        }
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
