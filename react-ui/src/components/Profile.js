import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/auth";
import UploadDocuments from "./UploadDocuments";
import ProofOfIdentity from "./ProofOfIdentity";
import { getAllConditionsThunk } from "../redux/conditions";
import { getAllDoctorsThunk } from "../redux/doctors";
import ReactModal from "react-modal";

import { Link } from "react-router-dom";

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      showUploadModal: false,
    };
    this.openUploadModal = this.openUploadModal.bind(this);
    this.closeUploadModal = this.closeUploadModal.bind(this);
  }

  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.loadUserInfo();
  }

  openUploadModal() {
    this.setState({ showUploadModal: true });
  }

  closeUploadModal() {
    this.setState({ showUploadModal: false });
  }

  render() {
    const { firstName, lastName, email } = this.props.currentUser;
    return (
      <div className="loginSignup">
        <h1>User Profile</h1>
        <h4>
          Name: {firstName} {lastName}
        </h4>
        <h4>Email: {email}</h4>

        <ProofOfIdentity {...this.props} />

        <Link to="#" onClick={() => this.openUploadModal()}>
          Upload your insurance card and ID card here.
        </Link>
        <div className="popup">
          <ReactModal
            isOpen={this.state.showUploadModal}
            contentLabel="Upload Documents"
          >
            <UploadDocuments closeUploadModal={this.closeUploadModal} />
            <button onClick={() => this.closeUploadModal()}>close</button>
          </ReactModal>
        </div>
        <Link to="documents">Upload your medical documents here.</Link>
      </div>
    );
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatch = (dispatch) => ({
  loadUserInfo: () => {
    dispatch(getAllConditionsThunk());
    dispatch(getAllDoctorsThunk());
  },
});

export default connect(mapState, mapDispatch)(Profile);
