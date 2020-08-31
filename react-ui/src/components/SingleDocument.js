import React, { Component } from "react";
import { updateDocumentThunk, fetchSingleDocument } from '../redux/singleDocument'
import { deleteDocumentsThunk } from '../redux/documents'
import { connect } from 'react-redux'
import UpdateDocument from './UpdateDocument'


export class SingleDocument extends Component {
  constructor() {
    super()
    this.state = {
      clicked: false
    }
    this.updateDocument = this.updateDocument.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
  }
  componentDidMount() {
    const { id } = this.props
    this.props.fetchSingleDocument(id)
  }

  updateDocument = () => {
    this.setState({ clicked: true })
  }

  handleDelete(id) {
    this.props.deleteDocumentsThunk(id)
    this.props.closeDocumentModal()
  }

  render() {
    const { id, imageUrl } = this.props.singleDocument

    return (
      <>
        <img src={imageUrl} alt='' />

        {this.state.clicked ?
          <UpdateDocument id={id} />
          : <button onClick={() => this.updateDocument()}>Update Document</button>
        }
        <button onClick={() => this.handleDelete(id)}>Delete Document</button>
      </>
    )
  }
}

const mapState = ({ currentUser, singleDocument }, ownProps) => {
  // const { id } = ownProps
  return {
    // singleDocument: currentUser.documents.find(document => document.id = id)
    singleDocument
  }
}

const mapDispatch = { updateDocumentThunk, fetchSingleDocument, deleteDocumentsThunk }

export default connect(mapState, mapDispatch)(SingleDocument);

