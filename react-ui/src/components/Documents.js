import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments } from '../redux/documents'
import { Link } from 'react-router-dom'

export class Documents extends Component {
  componentDidMount() {
    this.props.fetchDocuments()
  }

  render() {
    const { documents } = this.props.currentUser
    return (
      <>
        {
          !documents ? 'No Documents' :
            documents.map((doc, i) => {
              const { type } = doc
              return (
                <div key={i}>
                  {type === 'Proof of Identity' &&
                    <Link to={`/documents/${i}`}>
                      <img src={doc.imageUrl}
                        alt='document'
                        width="50%" height="50%"
                      // onError={() => props.onError(doc.public_id)}
                      />
                    </Link>
                  }
                </div>
              )
            }
            )
        }
      </>
    )
  }
}

const mapState = ({ currentUser }, ownProps) => {
  // const paramId = Number(ownProps.match.params.id)
  // let singleDocument = {}
  // if (documents) {
  //   singleDocument = documents.find((document, i) => i === paramId)
  // }
  return {
    currentUser,
    // singleDocument,
  }
}

const mapDispatch = { fetchDocuments }

export default connect(mapState, mapDispatch)(Documents)
