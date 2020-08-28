import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { connect } from 'react-redux'


export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      description: 'null',
      type: '',
      doctorId: 0,
      conditionId: 0,
      files: [],
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
    this.fileInput = React.createRef()
  }

  changeHandler(e) {
    const files = Array.from(this.fileInput.current.files)
    this.setState({
      [e.target.name]: e.target.value, files
    })
    console.log(this.state.description, this.state.type, this.state.files)
  }

  uploadHandler(e) {
    e.preventDefault()
    //formData is an object
    const formData = new FormData()
    this.state.files.forEach((file, i) => {
      formData.append(i, file)
    })
    console.log('why am I an empty object?', formData)
    const { description, type, doctorId, conditionId } = this.state
    const docInfo = {
      description,
      type,
      doctorId,
      conditionId,
      formData
    }
    console.log(docInfo)
    //post data will need to be an object
    this.props.uploadDocumentsThunk(docInfo)
  }

  render() {
    const { doctors, conditions } = this.props.currentUser
    const types = ['Proof of Identity', 'Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary']

    return (
      <>
        <form onSubmit={this.uploadHandler} >
          <label>Enter A Short Description</label>
          <input
            name='description'
            value={this.state.description}
            type='text'
            placeholder='Description'
            onChange={this.changeHandler}
          />
          <label>Select Type
          <select
              name='type'
              value={this.state.type}
              onChange={this.changeHandler}>
              {types.map((type, i) => {
                return (
                  <option key={i} value={type}>{type}</option>
                )
              })
              }
            </select>
          </label>
          <label>Label Doctor
          <select
              name='doctorId'
              value={this.state.doctorId}
              onChange={this.changeHandler}>
              {!doctors ? 'null' :
                doctors.map(doctor => {
                  const { id, firstName, lastName } = doctor
                  return (
                    <option key={id} value={id}>{firstName} {lastName}</option>
                  )
                })
              }
            </select>
          </label>
          <label>Label Condition
          <select
              name='conditionId'
              value={this.state.conditionId}
              onChange={this.changeHandler}>
              {!conditions ? 'null' :
                conditions.map(condition => {
                  const { id, name } = condition
                  return (
                    <option key={id} value={id}>{name}</option>
                  )
                })
              }
            </select>
          </label>

          <>
            <label>Choose File</label>
            <input
              type='file'
              ref={this.fileInput}
              onChange={this.changeHandler}
              multiple
            />
          </>
          <button type="submit" >Upload</button>
        </form>
      </>
    );
  };
}
const mapState = ({ currentUser }) => ({ currentUser })

const mapDispatch = { uploadDocumentsThunk }

export default connect(mapState, mapDispatch)(UploadDocuments);

