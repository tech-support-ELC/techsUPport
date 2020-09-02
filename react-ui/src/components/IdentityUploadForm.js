import React, { Component } from "react";


export class IdentityUploadForm extends Component {

  render() {
    const { description, uploadHandler, handleFileRead, handleChange } = this.props
    return (
      <form onSubmit={uploadHandler}>
        <label>Select what type of document this is:
          <select
            name='description'
            value={description}
            onChange={handleChange}
          >
            <option >ID Card</option>
            <option >Insurance Card</option>
          </select >
        </label >
        <label>Choose File</label>
        <input
          type='file'
          onChange={handleFileRead}
        />
        <button type="submit" >Upload</button>
      </form >
    );
  };
}

export default IdentityUploadForm

