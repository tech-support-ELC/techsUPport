import axios from "axios";
import { API_URL } from './API_URL'


/* -----------------    ACTION TYPES    ------------------ */

const GET_DOCUMENTS = "GET_DOCUMENTS";
const UPLOAD_DOCUMENT = "UPLOAD_DOCUMENT"


/* ------------     ACTION CREATORS      ------------------ */

const getDocuments = (documents) => ({ type: GET_DOCUMENTS, documents });
const uploadDocument = (document) => ({ type: UPLOAD_DOCUMENT, document });

/* ------------       THUNK CREATORS     ------------------ */
export const fetchDocuments = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/documents`);
      dispatch(getDocuments(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const uploadDocumentThunk = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/documents`, formData)
      dispatch(uploadDocument(data));
    } catch (error) {
      console.log(error);
    }
  }
}

/* ------------          REDUCER         ------------------ */

export default function (state = [], action) {
  switch (action.type) {

    case GET_DOCUMENTS:
      return action.documents;

    case UPLOAD_DOCUMENT:
      return [...state, action.document]

    default:
      return state;
  }
}


