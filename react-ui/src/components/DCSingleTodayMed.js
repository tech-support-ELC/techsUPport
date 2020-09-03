import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteTodayMedThunk } from "../redux/dcTodayMed";
import UpdateTodayMed from "./UpdateTodayMed";
class DCSingleTodayMed extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.updateMed = this.updateMed.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  updateMed = () => {
    this.setState({ clicked: true });
  };
  async handleDelete(id) {
    try {
      await this.props.removeTodayMed(id);
      this.props.closeTheModal();
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const singleTodayMeds = this.props.singleTodayMeds;
    if (!singleTodayMeds) {
      return "This Med is not in our system";
    } else {
      return (
        <div>
          <div>Medication Name: {singleTodayMeds.name} </div>
          <div>Notes: {singleTodayMeds.notes}</div>
          <div>{this.state.clicked && <UpdateTodayMed eachMed={singleTodayMeds}/>}</div>
          <div>
            {!this.state.clicked && (
              <button onClick={() => this.updateMed()}>
                Update
              </button>
            )}
          </div>
          {
            <button
              type="submit"
              onClick={() => this.handleDelete(singleTodayMeds.id)}
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
    singleTodayMeds: state.singleTodayMeds,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeTodayMed: (id) => dispatch(deleteTodayMedThunk(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DCSingleTodayMed);
