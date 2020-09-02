import React, { Component } from "react";
import {
  updateDocumentThunk,
  fetchSingleDocument,
} from "../redux/singleDocument";
import { deleteDocumentsThunk } from "../redux/documents";
import { connect } from "react-redux";
import UpdateDocument from "./UpdateDocument";

export class SingleDocument extends Component {
  constructor() {
    super();
    this.state = {
      clicked: false,
    };
    this.updateDocument = this.updateDocument.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  updateDocument = () => {
    this.setState({ clicked: true });
  };

  handleDelete(id) {
    this.props.deleteDocumentsThunk(id);
    this.props.closeDocumentModal();
  }

  render() {
    const { id, imageUrl, description } = this.props.singleDocument;

    return (
      <>
        <img src={imageUrl} alt="" />
        <p>{description}</p>
        <div>
          {this.state.clicked ? (
            <UpdateDocument id={id} />
          ) : (
            <button onClick={() => this.updateDocument()}>Update</button>
          )}
          <button onClick={() => this.handleDelete(id)}>Delete</button>
        </div>
      </>
    );
  }
}

const mapState = ({ singleDocument }) => ({ singleDocument });

const mapDispatch = {
  updateDocumentThunk,
  fetchSingleDocument,
  deleteDocumentsThunk,
};

export default connect(mapState, mapDispatch)(SingleDocument);
