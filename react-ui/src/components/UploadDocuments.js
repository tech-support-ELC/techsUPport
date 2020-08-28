import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { getAllConditionsThunk } from '../redux/conditions'
import { getAllDoctorsThunk } from '../redux/doctors'
import { connect } from 'react-redux'
import axios from 'axios'

export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
    }
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
    this.sendFile = this.sendFile.bind(this)
  }

  handleFileRead(e) {
    if (e.target.files[0]) {
      let reader = new FileReader()
      reader.onload = () => {
        this.setState({ selectedFile: reader.result })
      }
      reader.readAsDataURL(e.target.files[0])
    }
  }

  async sendFile() {
    const file = await axios.post(
      `https://api.cloudinary.com/v1_1/elementhealth/image/upload`,
      { file: this.state.selectedFile, upload_preset: 'capstone' }
    )
    return file.data.secure_url
  }

  async uploadHandler(e) {
    e.preventDefault()

    const description = e.target.description.value
    const type = e.target.type.value
    const doctorId = e.target.value || null
    const conditionId = e.target.value || null
    const imageUrl = await this.sendFile()

    const formData = {
      description,
      type,
      doctorId,
      conditionId,
      imageUrl
    }
    this.props.uploadDocumentsThunk(formData)
  }

  render() {
    const conditions = this.props.conditions;
    const doctors = this.props.doctors;
    const types = ['Proof of Identity', 'Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary']
    return (
      <form onSubmit={this.uploadHandler} >
        <label>Enter A Short Description</label>
        <input
          name='description'
          type='text'
          placeholder='Description'
        />
        <label>Select Type
          <select
            name='type'
          >
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
          >
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
          >
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
        <label>Choose File</label>
        <input
          type='file'
          onChange={this.handleFileRead}
        // multiple
        />
        <button type="submit" >Upload</button>
      </form>
    );
  };
}
const mapState = ({ currentUser, conditions, doctors }) => ({ currentUser, conditions, doctors })

const mapDispatch = { uploadDocumentsThunk, getAllConditionsThunk, getAllDoctorsThunk }

export default connect(mapState, mapDispatch)(UploadDocuments);

