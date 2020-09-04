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
      targetFile: {},
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
  }

  handleChange(e) {
    this.setState({ description: e.target.value })
  }

  handleFileRead(e) {
    if (e.target.files[0]) {
      const targetFile = Array.from(e.target.files)
      let reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        this.setState({
          selectedFile: reader.result,
          targetFile: targetFile[0]
        })
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
    const { description, targetFile, selectedFile } = this.state
    const type = 'Proof of Identity'
    const { id } = this.props

    const fileTypes = ['image/png', 'image/jpeg', 'image/gif']
    if (fileTypes.every(fileType => targetFile.type !== fileType)) {
      alert(`'${targetFile.type}' is not a supported format`)
    } else if (targetFile.size > 150000) {
      alert(`'${targetFile.name}' is too large, please pick a smaller file`)
    } else {
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

