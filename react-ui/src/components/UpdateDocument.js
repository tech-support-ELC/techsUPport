import React, { Component } from "react";
import { updateDocumentThunk } from '../redux/singleDocument'
import { connect } from 'react-redux'
import axios from 'axios'
import UploadForm from "./UploadForm";


export class UpdateDocument extends Component {
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

  componentDidMount() {
    let { description, type, doctorId, conditionId } = this.props.singleDocument
    if (!doctorId) doctorId = 'Select Doctor'
    if (!conditionId) conditionId = 'Select Condition'
    this.setState({
      description,
      type,
      doctorId,
      conditionId
    })
    console.log(this.props.singleDocument)
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
    this.props.updateDocumentThunk(id, formData)
  }

  render() {
    return (
      <UploadForm {...this.state} uploadHandler={this.uploadHandler} handleFileRead={this.handleFileRead} handleChange={this.handleChange} />
    );
  };
}

const mapState = ({ singleDocument }) => ({ singleDocument })

const mapDispatch = { updateDocumentThunk }

export default connect(mapState, mapDispatch)(UpdateDocument);

