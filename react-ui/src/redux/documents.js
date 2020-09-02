import axios from "axios";
// import { API_URL } from './API_URL'
import { UPDATE_DOCUMENT as UPDATE_DOCUMENT_LIST } from './singleDocument'


/* -----------------    ACTION TYPES    ------------------ */

const GET_DOCUMENTS = "GET_DOCUMENTS";
const UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT"
const DELETE_DOCUMENT = "DELETE_DOCUMENT"


/* ------------     ACTION CREATORS      ------------------ */

const getDocuments = (documents) => ({ type: GET_DOCUMENTS, documents });
const uploadDocument = (document) => ({ type: UPLOAD_DOCUMENT, document });
const deleteDocument = (id) => ({ type: DELETE_DOCUMENT, id });

/* ------------          REDUCER         ------------------ */

export default function (state = [], action) {
  switch (action.type) {

    case GET_DOCUMENTS:
      return action.documents;

    case UPLOAD_DOCUMENT:
      return [...state, action.document]

    case DELETE_DOCUMENT:
      return state.filter(document => document.id !== action.id)

    case UPDATE_DOCUMENT_LIST:
      return [...state].map(document => {
        if (document.id === action.id) {
          return action.document
        } else {
          return document
        }
      })
    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */
export const fetchDocuments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/documents`);
      dispatch(getDocuments(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const uploadDocumentThunk = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`/api/documents`, formData)
      dispatch(uploadDocument(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteDocumentsThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/documents/${id}`)
      dispatch(deleteDocument(id));
    } catch (error) {
      console.log(error);
    }
  }
}


