import React, { Component } from "react";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import SingleDocument from "./SingleDocument";
import UploadDocuments from "./UploadDocuments";
import { fetchDocuments } from "../redux/documents";
import { fetchSingleDocument } from "../redux/singleDocument";
import { getAllConditionsThunk } from "../redux/conditions";
import { getAllDoctorsThunk } from "../redux/doctors";

export class Documents extends Component {
  constructor() {
    super();
    this.state = {
      showDocumentModal: false,
      showUploadModal: false,
    };
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
    this.openDocumentModal = this.openDocumentModal.bind(this);
    this.closeDocumentModal = this.closeDocumentModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.fetchDocuments();
    this.props.getAllConditionsThunk();
    this.props.getAllDoctorsThunk();
  }

  openUploadModal() {
    this.setState({ showUploadModal: true });
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  async openDocumentModal(id) {
    this.setState({ showDocumentModal: true });
    await this.props.fetchSingleDocument(id);
  }

  closeDocumentModal() {
    this.setState({ showDocumentModal: false });
  }

  render() {
    const { documents } = this.props;
    if (!documents) {
      return "No Documents";
    }
    return (
      <div className="main">
        <div className="column">
          <h3>My Documents</h3>
          <h4>We currently only support image format such as png, jpeg, gif</h4>
          {documents.map((doc) => {
            const { type, id, description } = doc;
            return (
              <div key={id}>
                {type !== "Proof of Identity" && (
                  <div>
                    <button onClick={() => this.openDocumentModal(id)}>
                      {description}
                    </button>
                    <ReactModal
                      isOpen={this.state.showDocumentModal}
                      contentLabel="Single Document"
                      className="popup"
                    >
                      {" "}
                      <button
                        className="close"
                        onClick={() => this.closeDocumentModal()}
                      >
                        X
                      </button>
                      <SingleDocument
                        {...this.props}
                        closeDocumentModal={this.closeDocumentModal}
                        id={id}
                      />
                    </ReactModal>
                  </div>
                )}
              </div>
            );
          })}
          <button onClick={() => this.openUploadModal()}>
            Upload a Document
          </button>
        </div>

        <ReactModal
          isOpen={this.state.showUploadModal}
          contentLabel="Upload Documents"
          className="popup"
        >
          {" "}
          <button className="close" onClick={() => this.closeUploadModal()}>
            X
          </button>
          <UploadDocuments closeUploadModal={this.closeUploadModal} />
        </ReactModal>
      </div>
    );
  }
}

const mapState = ({ documents }) => ({ documents });
const mapDispatch = {
  fetchDocuments,
  fetchSingleDocument,
  getAllConditionsThunk,
  getAllDoctorsThunk,
};

export default connect(mapState, mapDispatch)(Documents);
