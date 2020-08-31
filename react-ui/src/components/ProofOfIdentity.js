import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDocuments } from "../redux/documents";

export class ProofOfIdentity extends Component {
  componentDidMount() {
    this.props.fetchDocuments();
  }

  render() {
    const { documents } = this.props.currentUser;
    return (
      <>
        {!documents
          ? "No documents yet"
          : documents.map((doc, i) => {
              const { type } = doc;
              return (
                <div key={i}>
                  {type === "Proof of Identity" && (
                    <img
                      src={doc.imageUrl}
                      alt="document"
                      width="50%"
                      height="50%"
                    />
                  )}
                </div>
              );
            })}
      </>
    );
  }
}

const mapState = ({ currentUser }) => ({ currentUser });

const mapDispatch = { fetchDocuments };

export default connect(mapState, mapDispatch)(ProofOfIdentity);
