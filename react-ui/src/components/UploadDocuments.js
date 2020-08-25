import React, { Component } from "react";
import axios from "axios";

export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      uploading: false,
      documents: []
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.uploadHandler = this.uploadHandler.bind(this)
  }

  changeHandler(e) {
    const files = Array.from(e.target.files)
    this.setState({
      uploading: true,
      documents: files
    })
  }

  async uploadHandler() {
    const formData = new FormData()
    this.state.documents.forEach((file, i) => {
      formData.append(i, file)
    })

    const { data } = await axios.post('api/uploadDocuments', formData)
    console.log(data)
    this.setState({
      uploading: false,
      documents: data
    })
  }

  render() {
    const { uploading, documents } = this.state
    return (
      <div>

        {
          documents.map((doc, i) => {
            return (
              <div key={i}>
                <img src={doc.secure_url} alt='document' />
              </div>
            )
          })
        }

        <p>
          <input type="file" onChange={this.changeHandler} multiple />
          <button type="submit" onClick={this.uploadHandler}>Upload</button>
        </p>
      </div>
    );
  };
}


export default UploadDocuments;
