import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllConditionsThunk, addConditionThunk, deleteConditionThunk } from '../redux/conditions';
import AddConditionForm from './AddConditionForm';
import { Link } from 'react-router-dom';
import ExtraCondition from './ExtraCondition';
class Conditions extends Component {
  constructor() {
    super();
    this.state = {
      display: false
    }
    this.display = this.display.bind(this);
  }
  componentDidMount() {
    this.props.getAllConditions();
  }
  display(){
    this.setState({
      display: !this.state.display
  })
  }
  render() {
    const conditions = this.props.conditions;
    return (
      <div>
        <AddConditionForm addCondition={this.props.addCondition} currentUser={this.props.currentUser}/>
        <Link to='/dailycheckin'>Complete your first daily checkin</Link>

        <h1>All conditions</h1>
        <div>
          {
            conditions && conditions.map(condition => {
              return (
                <div key={condition.id}>
                  <Link to={`/conditions/${condition.id}`}>
                  {condition.name}
                  </Link>
                  <div onClick={this.display}>
                    {condition.name}
                  </div>
                  <div>
                    {
                      this.state.display ? <ExtraCondition condition={condition}/> : null
                    }
                  </div>
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
    conditions: state.conditions,
    currentUser: state.currentUser,
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
