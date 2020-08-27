import React, { Component } from "react";
import { uploadDocumentsThunk } from '../redux/documents'
import { connect } from 'react-redux'

export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      description: 'null',
      type: '',
      labelDoctor: '',
      lableCondition: '',
      documents: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  changeHandler(e) {
    e.preventDefault()
    // an array of files
    const files = Array.from(e.target.files)
    this.setState({
      description: e.target.description.value,
      types: e.target.type.value,
      documents: files
    })
  }

  uploadHandler(e) {
    e.preventDefault()
    //formData is an object
    const formData = new FormData()
    this.state.documents.forEach((file, i) => {
      formData.append(i, file)
    })
    const description = e.target.description.value
    const
    const data = { description, formData }

    //post data will need to be an object
    this.props.uploadDocumentsThunk(data)
  }

  render() {
    return (
      <>
        <form onSubmit={this.uploadHandler}>
          <label>Enter Description</label>
          <input
            name='description'
            type='text'
            placeholder='Description'
          />
          <label>Select Type</label>
          <input
            name='type'
            type='selector'
          />
          <label>Label Doctor</label>
          <input
            name='type'
            type='selector'
          />
          <label>Label Condition</label>
          <input
            name='type'
            type='selector'
          />
          <p>
            <label>Choose File</label>
            <input
              type="file"
              id='singleUpload'
              onChange={this.changeHandler}
              required
            />
          </p>
          <button type="submit" >Upload</button>
        </form>
      </>
    );
  };
}

const mapDispatchToProps = { uploadDocumentsThunk }

export default connect(null, mapDispatchToProps)(UploadDocuments);

