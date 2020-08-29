import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactModal from 'react-modal'
import SingleDocument from './SingleDocument'
import UploadDocuments from './UploadDocuments'


export class Documents extends Component {
  constructor() {
    super()
    this.state = {
      showDocumentModal: false,
      showUploadModal: false
    }
    this.openUploadModal = this.openUploadModal.bind(this)
    this.closeUploadModal = this.closeUploadModal.bind(this)
    this.openDocumentModal = this.openDocumentModal.bind(this)
    this.closeDocumentModal = this.closeDocumentModal.bind(this)
  }

  componentDidMount() {
    ReactModal.setAppElement('body');
  }

  openUploadModal() {
    this.setState({ showUploadModal: true })
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false })
  }

  openDocumentModal() {
    this.setState({ showDocumentModal: true })
  }

  closeDocumentModal() {
    this.setState({ showDocumentModal: false })
  }

  render() {
    const { currentUser } = this.props
    const { documents } = currentUser
    if (!documents) {
      return 'No Documents'
    }
    return (
      <div>

        <button onClick={() => this.openUploadModal()}>Upload a Document</button>
        <ReactModal
          isOpen={this.state.showUploadModal}
          contentLabel="Upload Documents"
        >
          <UploadDocuments closeUploadModal={this.closeUploadModal} />
          <button onClick={() => this.closeUploadModal()}>close</button>
        </ReactModal>

        <h1>My Documents</h1>
        {documents && documents.map((doc) => {
          const { type, id, description } = doc
          return (
            <div key={id} >
              {type !== 'Proof of Identity' &&
                <div >
                  <button onClick={() => this.openDocumentModal()}>{description}</button>
                  <ReactModal
                    isOpen={this.state.showDocumentModal}
                    contentLabel="Single Document"
                  >
                    <SingleDocument {...this.props} closeDocumentModal={this.closeDocumentModal} id={id} />
                    <button onClick={() => this.closeDocumentModal()}>close</button>
                  </ReactModal>
                </div>
              }
            </div>
          )
        })
        }
      </div >
    )
  }
}

const mapState = ({ currentUser }) => ({ currentUser })

export default connect(mapState)(Documents)
