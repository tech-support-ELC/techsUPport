import React, { Component } from 'react'
import { connect } from 'react-redux'
import UploadProofOfIdentity from './UploadProofOfIdentity'
import ReactModal from "react-modal";
import ProofOfIdentity from './ProofOfIdentity'
import { getAllConditionsThunk } from '../redux/conditions'
import { getAllDoctorsThunk } from '../redux/doctors'
import { Link } from 'react-router-dom'
import { fetchDocuments } from '../redux/documents';


class Profile extends Component {
  constructor() {
    super()
    this.state = {
      showUploadModal: false,

    };
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.loadUserInfo()
    this.props.fetchDocuments()
  }

  openUploadModal() {
    this.setState({ showUploadModal: true });
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  render() {
    const { firstName, lastName, email } = this.props.currentUser
    const { documents } = this.props
    if (!documents) {
      return "No Documents";
    }
    return (
      <div>
        <h1>User Profile</h1>
        <h4>Name: {firstName} {lastName}</h4>
        <h4>Email: {email}</h4>

        {
          documents.map((doc) => {
            const { type, id, imageUrl, description } = doc
            return (
              <div key={id}>
                {
                  type === 'Proof of Identity' &&
                  <ProofOfIdentity id={id} imageUrl={imageUrl} description={description} />
                }
              </div>
            )
          })
        }

        <Link to='#' onClick={() => this.openUploadModal()}>
          Upload your insurance card and ID card here.
          </Link>
        <div className="popup">
          <ReactModal
            isOpen={this.state.showUploadModal}
            contentLabel="Upload Documents"
          >
            <UploadProofOfIdentity closeUploadModal={this.closeUploadModal} />
            <button onClick={() => this.closeUploadModal()}>close</button>
          </ReactModal>
        </div>
        <Link to='documents'>Upload your medical documents here.</Link>

      </div >
    )
  }
}

const mapState = ({ currentUser, documents }) => ({ currentUser, documents })

const mapDispatch = (dispatch) => ({
  loadUserInfo: () => {
    dispatch(getAllConditionsThunk())
    dispatch(getAllDoctorsThunk())
  },
  fetchDocuments: () => dispatch(fetchDocuments()),
})


export default connect(mapState, mapDispatch)(Profile)
