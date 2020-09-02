import React, { Component } from "react";
import { uploadDocumentThunk } from '../redux/documents'
import { connect } from 'react-redux'
import axios from 'axios'
import UploadForm from "./UploadForm";


export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      description: '',
      type: '',
      doctorId: '',
      conditionId: ''
    }
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
    this.sendFile = this.sendFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value })
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
    const { description, type, doctorId, conditionId } = this.state
    let formData = {}
    if (this.state.selectedFile) {
      const imageUrl = await this.sendFile()
      formData = {
        description,
        type,
        doctorId,
        conditionId,
        imageUrl
      }
    } else {
      formData = {
        description,
        type,
        doctorId,
        conditionId
      }
    }
    this.props.uploadDocumentThunk(formData)
    this.props.closeUploadModal()
  }

  render() {
    return (
      <UploadForm {...this.state} uploadHandler={this.uploadHandler} handleFileRead={this.handleFileRead} handleChange={this.handleChange} />
    );
  };
}

const mapDispatch = { uploadDocumentThunk }

export default connect(null, mapDispatch)(UploadDocuments);

