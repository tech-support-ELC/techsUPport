import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { connect } from 'react-redux'
import { currentUser } from '../store'

export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      description: 'null',
      type: '',
      doctorId: 0,
      conditionId: 0,
      documents: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  changeHandler(e) {
    e.preventDefault()
    // an array of files
    const files = Array.from(e.target.files)
    this.setState({
      description: e.target.description.value,
      type: e.target.type.value,
      doctorId: e.target.doctorId.value,
      conditionId: e.target.conditionId.value,
      documents: files
    })
  }

  uploadHandler(e) {
    e.preventDefault()
    //formData is an object
    const formData = new FormData()
    this.state.documents.forEach((file, i) => {
      formData.append(i, file)
    })
    const description = e.target.description.value
    const type = e.target.type.value
    const doctorId = e.target.labeldoctor.value
    const conditionId = e.target.labelcondition.value
    const docInfo = {
      description,
      type,
      doctorId,
      conditionId,
      formData
    }
    //post data will need to be an object
    this.props.uploadDocumentsThunk(docInfo)
  }

  render() {
    const { doctors, conditions } = this.props.currentUser
    const types = ['Proof of Identity', 'Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary']

    return (
      <>
        <form onSubmit={this.uploadHandler} >
          <label>Enter Description</label>
          <input
            name='description'
            type='text'
            placeholder='Description'
          />
          <label>Select Type
          <select
              name='type'
              value={this.state.type}
              onChange={this.changeHandler}>
              {types.forEach(type => {
                return (
                  <option value={type}>{type}</option>
                )
              })
              }
            </select>
          </label>
          <label>Label Doctor
          <select
              name='labeldoctor'
              value={this.state.doctorId}
              onChange={this.changeHandler}>
              {doctors.forEach(doctor => {
                const { id, firstName, lastName } = doctor
                return (
                  <option value={id}>{firstName} {lastName}</option>
                )
              })
              }
            </select>
          </label>
          <label>Label Condition
          <select
              name='labelcondition'
              value={this.state.conditionId}
              onChange={this.changeHandler}>
              {conditions.forEach(condition => {
                const { id, name } = condition
                return (
                  <option value={id}>{name}</option>
                )
              })
              }
            </select>
          </label>
          <p>
            <label>Choose File</label>
            <input
              type="file"
              onChange={this.changeHandler}
            // multiple
            />
          </p>
          <button type="submit">Upload</button>
        </form>
      </>
    );
  };
}
const mapState = { currentUser }

const mapDispatch = { uploadDocumentsThunk }

export default connect(mapState, mapDispatch)(UploadDocuments);

