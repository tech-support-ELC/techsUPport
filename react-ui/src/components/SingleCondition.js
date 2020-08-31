import React, {Component} from 'react';
import {connect} from 'react-redux';
import {deleteConditionThunk} from '../redux/conditions';
import UpdateCondition from './UpdateCondition';
class SingleCondition extends Component {
  constructor() {
    super()
    this.state = {
      clicked: false
    }
    this.updateCondition = this.updateCondition.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
}
  updateCondition = () => {
    this.setState({ clicked: true })
  }
  async handleDelete(id) {
    try {
      await this.props.deleteCondition(id)
      this.props.closeTheModal()
    } catch (err) {
      console.log(err)
    }
  }
  render() {
    const condition = this.props.condition;
    if (!condition) {
      return "This condition is not in our system"
    } else {
      return (
        <div>
          <div>Condition: {condition.name} </div>
          <div>Has this been diagnosed?:  {condition.diagnosed}</div>
          <div>Physical or mental condition?: {condition.typeOfPain}</div>
          <div>
            {this.state.clicked && <UpdateCondition />}
          </div>
          <div>
            {!this.state.clicked &&
              <button onClick={() => this.updateCondition()}>Update Condition</button>
            }
          </div>
          {
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
}
const mapStateToProps = state => {
  return {
    condition: state.condition,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    removeCondition: id => dispatch(deleteConditionThunk(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleCondition)
