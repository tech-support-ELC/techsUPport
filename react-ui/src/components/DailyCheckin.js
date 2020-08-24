import React, {Component} from 'react'
import {connect} from 'react-redux';
import {getAllConditionsThunk} from '../redux/conditions';
import {fetchMedications} from '../redux/medications';
// import {} from '../redux/doctors';

class DailyCheckin extends Component {
  constructor() {
    super();
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getAllConditions();
  }
  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }
  handleSubmit(evt) {
    evt.preventDefault();
  }
  render() {
    const conditions = this.props.conditions;
    const medications = this.props.medications;
    const doctors = this.props.doctors;
    return (
      <div>
        <h1>Daily checkin</h1>
        <div>
          {
            conditions && conditions.map(condition => {
              return (
                <form onSubmit={this.handleSubmit}>
                  <label>
                    {condition.name}
                    <input
                      name={condition.name}
                      type="checkbox"
                      checked={this.state.name}
                      onChange={this.handleChange} />
                  </label>
                </form>
              )
            })
          }
        </div>
        <div>
          {
            medications && medications.map(medication => {
              return (
                <div>{medication.name}</div>
              )
            })
          }
        </div>
        <div>
          {
            doctors && doctors.map(doctor => {
              return (
                <div>{doctor.firstName} {doctor.lastName}</div>
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
    doctors: state.doctors,
    medications: state.medications
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllConditions: () => dispatch(getAllConditionsThunk()),
    getAllMedications: () => dispatch(fetchMedications()),
    // getAllDoctors: () => dispatch(()),
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DailyCheckin)
