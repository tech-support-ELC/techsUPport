import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllConditionsThunk, addConditionThunk, deleteConditionThunk } from '../redux/conditions';
import AddConditionForm from './AddConditionForm';
import { Link } from 'react-router-dom'

class Conditions extends Component {
  componentDidMount() {
    this.props.getAllConditions();
  }
  render() {
    const conditions = this.props.conditions;
    return (
      <div>
        <AddConditionForm addCondition={this.props.addCondition} />
        <Link to='/dailycheckin'>Complete your first daily checkin</Link>
        <h1>All conditions</h1>
        <div>
          {
            conditions && conditions.map(condition => {
              return (
                <div key={condition.key}>
                  {condition.name}
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    conditions: state.conditions
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllConditions: () => dispatch(getAllConditionsThunk()),
    addCondition: (condition) => dispatch(addConditionThunk(condition)),
    deleteCondition: (id) => dispatch(deleteConditionThunk(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Conditions)
