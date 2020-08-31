import React, { Component } from "react";
import { connect } from "react-redux";
import { logout } from "../redux/auth";
import UploadDocuments from "./UploadDocuments";
import ProofOfIdentity from "./ProofOfIdentity";
import { getAllConditionsThunk } from "../redux/conditions";
import { getAllDoctorsThunk } from "../redux/doctors";
import ReactModal from "react-modal";

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);
  }
  componentDidMount() {
    ReactModal.setAppElement("body");
    this.props.loadUserInfo();
  }

  openModal() {
    this.setState({ showModal: true });
  }

  closeModal() {
    this.setState({ showModal: false });
  }

  render() {
    const { firstName, lastName, email } = this.props.currentUser;
    const { handleClick } = this.props;
    return (
      <div className="loginSignup">
        <h1>User Profile</h1>
        <p>
          Name: {firstName} {lastName}
        </p>
        <p>Email: {email}</p>
        <div>Your insurance card and ID card:</div>
        <p>
          <ProofOfIdentity {...this.props} />
        </p>
        <button onClick={this.openModal}>Update documents</button>
        <ReactModal
          isOpen={this.state.showModal}
          contentLabel="Example Modal"
          className="popup"
        >
          <p>
            <UploadDocuments />
          </p>
          <button onClick={this.closeModal}>Close</button>
        </ReactModal>

        <button type="submit" onClick={handleClick} id="signup">
          Log out
        </button>
      </div>
    );
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatch = (dispatch, ownProps) => ({
  handleClick: () => {
    dispatch(logout(ownProps.history));
  },
  loadUserInfo: () => {
    dispatch(getAllConditionsThunk());
    dispatch(getAllDoctorsThunk());
  },
});

export default connect(mapState, mapDispatch)(Profile);
