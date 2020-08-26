import axios from "axios";


/* -----------------    ACTION TYPES    ------------------ */

const GET_DOCUMENTS = "GET_DOCUMENTS";
const UPLOAD_DOCUMENTS = "UPLOAD_DOCUMENTS"

/* ------------     ACTION CREATORS      ------------------ */

const getDocuments = (documents) => ({ type: GET_DOCUMENTS, documents });
const uploadDocuments = (documents) => ({ type: UPLOAD_DOCUMENTS, documents });


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

/* ------------       THUNK CREATORS     ------------------ */
export const fetchDocuments = () => {
  return async (dispatch) => {
    try {
      // figure out the api request for Cloudinary
      const { data } = await axios.get("/api/uploadDocuments");
      console.log(data.resources)
      dispatch(getDocuments(data.resources));
    } catch (error) {
      console.log(error);
    }
  }
}

export const uploadDocumentsThunk = (formData) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post('api/uploadDocuments', formData)
      dispatch(uploadDocuments(data));
    } catch (error) {
      console.log(error);
    }
  }
}



