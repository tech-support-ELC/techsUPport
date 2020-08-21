import React from 'react';
import {connect} from 'react-redux';
import {getAllConditionsThunk} from '../store/conditions';

class Conditions extends React.Component {
  componentDidMount() {
    this.props.getAllConditions();
  }
  render() {
    const conditions = this.props.conditions;
    return (
      <div>
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
    getAllConditions: () => dispatch(getAllConditionsThunk())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Conditions)
