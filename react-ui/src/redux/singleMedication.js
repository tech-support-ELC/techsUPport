import axios from "axios";

const GET_MEDICATION = "GET_MEDICATION";

const initialState = {};

const getSingleMedication = (medication) => ({
  type: GET_MEDICATION,
  medication,
});

export const fetchMedication = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/medications/${id}`);
      dispatch(getSingleMedication(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateMedication = (medication, updatedMedication) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.put(
        `/api/medications/${medication.id}`,
        updatedMedication
      );
      dispatch(getSingleMedication(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDICATION:
      return action.medication;
    default:
      return state;
  }
}
