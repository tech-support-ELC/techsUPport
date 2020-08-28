import axios from "axios";
import { API_URL } from './API_URL'


/* -----------------    ACTION TYPES    ------------------ */


const UPDATE_DOCUMENT = "UPDATE_DOCUMENT"
const DELETE_DOCUMENT = "DELETE_DOCUMENT"

/* ------------     ACTION CREATORS      ------------------ */


const updateDocument = (document) => ({ type: UPDATE_DOCUMENT, document });
const deleteDocument = () => ({ type: DELETE_DOCUMENT });


/* ------------          REDUCER         ------------------ */

export default function (state = {}, action) {
  switch (action.type) {

    case UPDATE_DOCUMENT:
      return action.document;

    case DELETE_DOCUMENT:
      return {}

    default:
      return state;
  }
}

/* ------------       THUNK CREATORS     ------------------ */
export const updateDocumentThunk = (id, document) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/documents/${id}`, document);
      dispatch(updateDocument(data));
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteDocumentsThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`${API_URL}/api/documents/${id}`)
      dispatch(deleteDocument());
    } catch (error) {
      console.log(error);
    }
  }
}



