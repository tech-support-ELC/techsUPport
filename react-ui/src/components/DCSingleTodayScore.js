import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodayScoreThunk } from "../redux/dcTodayScore";
import UpdateTodayScore from "./UpdateTodayScore";
class DCSingleTodayScore extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.updateScore = this.updateScore.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  updateScore = () => {
    this.setState({ clicked: true });
  };
  async handleDelete(id) {
    try {
      await this.props.removeTodayScore(id);
      this.props.closeTheModal();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const singleTodayScore = this.props.singleTodayScore;
    if (!singleTodayScore) {
      return "This score is not in our system";
    } else {
      return (
        <div>
          <div>Condition Name: {singleTodayScore.name} </div>
          <div>Rate: {singleTodayScore.rate}</div>
          <div>Notes: {singleTodayScore.notes}</div>
          <div>{this.state.clicked && <UpdateTodayScore eachScore={singleTodayScore}/>}</div>
          <div>
            {!this.state.clicked && (
              <button onClick={() => this.updateScore()}>
                Update
              </button>
            )}
          </div>
          {
            <button
              type="submit"
              onClick={() => this.handleDelete(singleTodayScore.id)}
            >
              Delete
            </button>
          }
        </div>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    singleTodayScore: state.singleTodayScore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeTodayScore: (id) => dispatch(deleteTodayScoreThunk(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DCSingleTodayScore);
