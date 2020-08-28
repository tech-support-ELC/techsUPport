import axios from "axios";
import { API_URL } from './API_URL'


/* -----------------    ACTION TYPES    ------------------ */

const GET_DOCUMENTS = "GET_DOCUMENTS";
const UPLOAD_DOCUMENTS = "UPLOAD_DOCUMENTS"


/* ------------     ACTION CREATORS      ------------------ */

const getDocuments = (documents) => ({ type: GET_DOCUMENTS, documents });
const uploadDocuments = (documents) => ({ type: UPLOAD_DOCUMENTS, documents });

/* ------------       THUNK CREATORS     ------------------ */
export const fetchDocuments = () => {
  return async (dispatch) => {
    try {
      // figure out the api request for Cloudinary
      const { data } = await axios.get(`${API_URL}/api/documents`);
      dispatch(getDocuments(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const uploadDocumentsThunk = (documents) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/documents`, documents)
      dispatch(uploadDocuments(data));
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

    case UPLOAD_DOCUMENTS:
      return state.concat(action.documents);

    default:
      return state;
  }
}


