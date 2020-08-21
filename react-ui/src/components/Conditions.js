import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getAllConditionsThunk, addConditionThunk} from '../redux/conditions';
import AddConditionForm from './AddConditionForm'
class Conditions extends Component {
  componentDidMount() {
    this.props.getAllConditions();
  }
  render() {
    const conditions = this.props.conditions;
    return (
      <div>
        <AddConditionForm addCondition={this.props.addCondition} />
        <h1>All conditions</h1>
        <div>
          {
            conditions && conditions.map(condition => {
              return (
                <div>{condition.name}</div>
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
    addCondition: (condition) => dispatch(addConditionThunk(condition))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Conditions)
