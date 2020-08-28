import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { connect } from 'react-redux'
import axios from 'axios'


export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      selectedFiles: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  changeHandler(e) {
    // FileList, an array like iterable data structure
    const selectedFiles = Array.from(e.target.files)
    this.setState({ selectedFiles })
  }

  async sendFile() {
    const files = new FormData();
    this.state.selectedFiles.forEach((file, i) => {
      files.append(i, file)
      console.log(files.get(i))
    })

    const file = await axios.post(
      `https://api.cloudinary.com/v1_1/elementhealth/image/upload`,
      { type: 'private', upload_preset: 'capstone' }
    )
    return file.data.secure_url
  }

  async uploadHandler(e) {
    e.preventDefault()

    const description = e.target.description.value
    const type = e.target.type.value
    const doctorId = e.target.doctorId.value
    const conditionId = e.target.conditionId.value
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
    const { doctors, conditions } = this.props.currentUser
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
          onChange={this.changeHandler}
          multiple
        />
        <button type="submit" >Upload</button>
      </form>
    );
  };
}
const mapState = ({ currentUser }) => ({ currentUser })

const mapDispatch = { uploadDocumentsThunk }

export default connect(mapState, mapDispatch)(UploadDocuments);

