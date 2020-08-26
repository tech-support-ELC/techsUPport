import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchDocuments } from '../redux/documents'
import { Link } from 'react-router-dom'

export class Documents extends Component {
  componentDidMount() {
    this.props.fetchDocuments()
  }

  render() {
    const { documents } = this.props
    return (
      <>
        {
          !documents ? 'No Documents' :
            documents.map((doc, i) => (
              <div key={i}>
                <Link to={`/documents/${i}`}>
                  <img src={doc.secure_url}
                    alt='document' width="200" height="200"
                    onError={() => props.onError(doc.public_id)} />
                </Link>
              </div>
            ))
        }
      </>
    )
  }
}

const mapState = ({ documents }, ownProps) => {
  const paramId = Number(ownProps.match.params.id)
  let singleDocument = {}
  if (documents) {
    singleDocument = documents.find((document, i) => i === paramId)
  }
  return {
    documents,
    singleDocument
  }
}

const mapDispatch = { fetchDocuments }

export default connect(mapState, mapDispatch)(Documents)
