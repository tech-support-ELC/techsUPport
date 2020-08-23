import axios from "axios";

const GET_MEDICATIONS = "GET_MEDICATIONS";

const initialState = [];

const getMedications = (medications) => ({
  type: GET_MEDICATIONS,
  medications,
});

export const fetchMedications = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/api/medications");
      dispatch(getMedications(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDICATIONS:
      return action.medications;
    default:
      return state;
  }
}
