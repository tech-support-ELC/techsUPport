import React, { Component } from "react";
import axios from "axios";

export class UploadDocuments extends Component {
  constructor() {
    super()
    this.state = {
      uploading: false,
      documents: []
    }

  }
  async onChange(e) {
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })

    const { data } = await axios.post('/api/uploadDocuments', formData)
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
          uploading ? 'spinning' :

            documents.map(doc => {
              const { id } = doc
              return (
                <ul key={id}>
                  <img src={doc.secure_url} alt='document' />
                </ul>
              )
            })
        }
        <p>
          < button type="file" onChange={this.onChange} multiple>Upload</button>
        </p>
      </div>
    );
  };
}

export default UploadDocuments;
