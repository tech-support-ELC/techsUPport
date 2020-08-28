import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
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
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.setState({ selectedFile: reader.result })
      }
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
    const doctorId = e.target.doctorId.value || null
    const conditionId = e.target.conditionId.value || null
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
    const { doctors, conditions } = this.props
    const types = ['Proof of Identity', 'Lab Result', 'Surgical Report', 'Pathology Report', 'Imaging', 'Visit Summary']
    return (
      <form onSubmit={this.uploadHandler}>
        <label>Enter a short description of what this document contains:</label>
        <input
          name='description'
          type='text'
          placeholder='Description'
        />
        <label>Select what type of document this is:
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
        <label>Which doctor is this document associated with?
          <select
            name='doctorId'
          >
            <option>Select Doctor</option>
            {doctors &&
              doctors.map(doctor => {
                const { id, firstName, lastName } = doctor
                return (
                  <option key={id} value={id}>{firstName} {lastName}</option>
                )
              })
            }
          </select>
        </label>
        <label>What condition does this document relate to?
          <select
            name='conditionId'
          >
            <option>Select Condition</option>
            {conditions &&
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
const mapState = ({ currentUser, doctors, conditions }) => ({ currentUser, doctors, conditions })

const mapDispatch = { uploadDocumentsThunk }

export default connect(mapState, mapDispatch)(UploadDocuments);

