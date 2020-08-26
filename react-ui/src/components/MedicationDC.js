import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getMedicationThunk, addMedicationThunk} from '../redux/dcMedication';
import DCMedicationForm from './DCMedicationForm';
class MedicationDC extends Component {
  componentDidMount() {
    this.props.getMedication();
  }
  render() {
    const med = this.props.med;
    return (
      <div>
        <h1>Daily checkin</h1>
        <h3>Medications</h3>
        {
          med && med.map(eachMed => {
            return (
              <div key={eachMed.id}>
                <DCMedicationForm eachMed={eachMed} addMedication={this.props.addMedication}/>
            </div>
            )
          })
        }
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    med: state.med
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getMedication: () => dispatch(getMedicationThunk()),
    addMedication: (med) => dispatch(addMedicationThunk(med))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MedicationDC)
