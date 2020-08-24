import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  getSingleConditionThunk,
  updateSingleConditionThunk
} from '../redux/singleCondition'
import EditCondition from './EditCondition'
import {deleteConditionThunk} from '../redux/conditions'
class SingleCondition extends Component {
  componentDidMount() {
    console.log(this.props);
    const id = this.props.match.params.id;
    this.props.getSingleCondition(id);
  }
  render() {
    const condition = this.props.condition;
    return (
      <div>
        {condition &&
        <EditCondition
          conditionId={condition.id}
          editCondition={this.props.editCondition}
        />
        }
        <div>
          {condition && condition.name}
        </div>
        <div>
          {condition && condition.diagnosed}
        </div>
        <div>
          {condition && condition.typeOfPain}
        </div>
        {
          condition &&
          <button
          type="submit"
          onClick={() => this.props.removeCondition(condition.id)}
        >
          Remove Condition
        </button>
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    condition: state.condition,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getSingleCondition: id => dispatch(getSingleConditionThunk(id)),
    editCondition: (id, condition) =>
      dispatch(updateSingleConditionThunk(id, condition)),
    removeCondition: id => dispatch(deleteConditionThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCondition)
