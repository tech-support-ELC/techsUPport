import React, { Component } from "react";
import { updateDocumentThunk } from '../redux/singleDocument'
import { connect } from 'react-redux'
import axios from 'axios'
import IdentityUploadForm from './IdentityUploadForm'


export class UpdateProofOfIdentity extends Component {
  constructor() {
    super()
    this.state = {
      selectedFile: null,
      description: ''
    }
    this.uploadHandler = this.uploadHandler.bind(this)
    this.handleFileRead = this.handleFileRead.bind(this)
    this.sendFile = this.sendFile.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    const { description } = this.props
    this.setState({ description })
    console.log(description)
  }

  handleChange(e) {
    this.setState({ description: e.target.value })
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
    const { description, selectedFile } = this.state
    const type = 'Proof of Identity'
    const { id } = this.props

    let formData = {}
    if (selectedFile) {
      const imageUrl = await this.sendFile()
      formData = {
        description,
        type,
        imageUrl
      }
    } else {
      formData = {
        description,
        type,
      }
    }
    this.props.updateDocumentThunk(id, formData)
  }

  render() {
    const { imageUrl, description } = this.props
    return (
      <div><img src={imageUrl} alt='Proof of Identity' width="50%" height="50%" />
        <p>{description}</p>

        <IdentityUploadForm {...this.state} uploadHandler={this.uploadHandler} handleFileRead={this.handleFileRead} handleChange={this.handleChange} imageUrl={imageUrl} />
      </div>
    );
  };
}
const mapDispatch = { updateDocumentThunk }

export default connect(null, mapDispatch)(UpdateProofOfIdentity);

