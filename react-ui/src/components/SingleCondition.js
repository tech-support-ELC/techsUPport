import React, {Component} from 'react';
import {connect} from 'react-redux'
import {
  getSingleConditionThunk,
  updateSingleConditionThunk
} from '../redux/singleCondition'
import EditCondition from './EditCondition'

class SingleCondition extends Component {
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getSingleCondition(id)
  }
  render() {
    const condition = this.props.condition
    return (
      <div>
          <EditCondition
            conditionId={condition.id}
            editCondition={this.props.editCondition}
          />
        )}
        <div>
          {condition.name}
        </div>
        <div>
          {condition.diagnosed}
        </div>
        <div>
          {condition.typeOfPain}
        </div>
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCondition)
