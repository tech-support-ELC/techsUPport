import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { connect } from 'react-redux'

export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      documents: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  changeHandler(e) {
    e.preventDefault()
    const files = Array.from(e.target.files)
    this.setState({
      documents: files
    })
  }

  uploadHandler(e) {
    e.preventDefault()
    const formData = new FormData()
    this.state.documents.forEach((file, i) => {
      formData.append(i, file)
    })
    this.props.uploadDocumentsThunk(formData)
  }

  render() {
    return (
      <>
        <input type="file" onChange={this.changeHandler} multiple />
        <button type="submit" onClick={this.uploadHandler}>Upload</button>
      </>
    );
  };
}

const mapDispatchToProps = { uploadDocumentsThunk }

export default connect(null, mapDispatchToProps)(UploadDocuments);

