import React, { Component } from "react";
import { updateDocumentThunk } from '../redux/singleDocument'
import { connect } from 'react-redux'
import axios from 'axios'

export class UploadDocument extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      type: 'Proof of Identity'
    }
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
    this.sendFile = this.sendFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ type: e.target.value })
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
    if (this.state.selectedFile) {
      const file = await axios.post(
        `https://api.cloudinary.com/v1_1/elementhealth/image/upload`,
        { file: this.state.selectedFile, upload_preset: 'capstone' }
      )
      return file.data.secure_url
    }
  }

  async uploadHandler(e) {
    e.preventDefault()
    const { id } = this.props
    const description = e.target.description.value
    const type = this.state.type

    let doctorId = null
    if (e.target.doctorId) doctorId = e.target.doctorId.value
    doctorId = null

    let conditionId = null
    if (e.target.conditionId) conditionId = e.target.conditionId.value
    conditionId = null

    if (this.state.selectedFile) {
      const imageUrl = await this.sendFile()
      const formData = {
        description,
        type,
        doctorId,
        conditionId,
        imageUrl
      }
      this.props.updateDocumentThunk(id, formData)
    } else {
      const formData = {
        description,
        type,
        doctorId,
        conditionId
      }
      this.props.updateDocumentThunk(id, formData)
    }
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
            value={this.state.type}
            onChange={this.handleChange}
          >
            {types.map((type, i) => {
              return (
                <option key={i} value={type}>{type}</option>
              )
            })
            }
          </select>
        </label>
        {this.state.type !== 'Proof of Identity' && (
          <div>
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
          </div>
        )}
        <label>Choose File to Replace Current File</label>
        <input
          type='file'
          onChange={this.handleFileRead}
        // multiple
        />
        <button type="submit" >Update</button>
      </form>
    );
  };
}
const mapState = ({ doctors, conditions }) => ({ doctors, conditions })

const mapDispatch = { updateDocumentThunk }

export default connect(mapState, mapDispatch)(UploadDocument);

