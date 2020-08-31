import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchDocuments, deleteDocumentsThunk } from "../redux/documents";

export class ProofOfIdentity extends Component {
  componentDidMount() {
    this.props.fetchDocuments();
  }

  render() {
    const { documents, deleteDocumentsThunk } = this.props;
    if (!documents) {
      return "No Documents";
    }
    return (
      <>
        {documents.map((doc) => {
          const { type, id, imageUrl } = doc;
          return (
            <div key={id}>
              {type === "Proof of Identity" && (
                <div>
                  <img src={imageUrl} alt="document" width="50%" height="50%" />
                  <>
                    <button onClick={() => deleteDocumentsThunk(id)}>
                      Delete Document
                    </button>
                  </>
                </div>
              )}
            </div>
          );
        })}
      </>
    );
  }
}

const mapState = ({ documents }) => ({ documents });

const mapDispatch = { fetchDocuments, deleteDocumentsThunk };

export default connect(mapState, mapDispatch)(ProofOfIdentity);
