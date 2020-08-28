import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { getAllConditionsThunk } from '../redux/conditions'
import { getAllDoctorsThunk } from '../redux/doctors'
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
  async componentDidMount() {
    await this.props.getAllConditionsThunk();
    await this.props.getAllDoctorsThunk();
  }
  changeHandler(e) {
    // e.preventDefault()
    console.log('fileinput', this.fileInput)
    const files = Array.from(this.fileInput.current.files)
    this.setState({
      [e.target.name]: e.target.value,
      files
    })
    console.log('state',this.state)
  }

  uploadHandler(e) {
    e.preventDefault()
    //formData is an object
    const files = Array.from(this.fileInput.current.files)
    // const files = this.fileInput.current.files
    console.log('files', this.fileInput.current.files)
    const test = this.fileInput.current.files
    const formData = {
      lastModified: files[0].lastModified,
      lastModifiedDate:files[0].lastModifiedDate,
      name: files[0].name,
      size: files[0].size,
      type: files[0].type,
      webkitRelativePath: files[0].webkitRelativePath,
    }
    // files.forEach((file, i) => {
    //   console.log(file, i)
    //   formData[i] = file;
    // })
    // console.log(Object.values(files[0]))
    // for (let i=0; i<files.length; i++) {
    //   console.log(typeof(files[i]), i)
    //   formData.append(i, files[i])
    // }
    console.log('formdata',formData)
    const { description, type, doctorId, conditionId } = this.state
    const docInfo = {
      description,
      type,
      doctorId,
      conditionId,
      formData,
    }
    //post data will need to be an object
    this.props.uploadDocumentsThunk(docInfo)
  }

  render() {
    const conditions = this.props.conditions;
    const doctors = this.props.doctors;
    const types = ['Proof of Identity', 'Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary']
    return (
      <>
        <form onSubmit={this.uploadHandler} >
          <label>Enter A Short Description</label>
          <input
            name='description'
            // value={this.state.description}
            type='text'
            placeholder='Description'
            onChange={this.changeHandler}
          />
          <label>Select Type
          <select
              name='type'
              // value={this.state.type}
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
              // value={this.state.doctorId}
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
              // value={this.state.conditionId}
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
              type="file"
              ref={this.fileInput}
              onChange={this.changeHandler}
              multiple
            />
          </>
          <button type="submit">Upload</button>
        </form>
      </>
    );
  };
}
const mapState = ({ currentUser, conditions, doctors }) => ({ currentUser, conditions, doctors })

const mapDispatch = { uploadDocumentsThunk, getAllConditionsThunk, getAllDoctorsThunk }

export default connect(mapState, mapDispatch)(UploadDocuments);

