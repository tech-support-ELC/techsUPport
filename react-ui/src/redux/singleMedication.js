import axios from "axios";
import { API_URL } from "./API_URL";

const GET_MEDICATION = "GET_MEDICATION";

const initialState = {};

const getSingleMedication = (medication) => ({
  type: GET_MEDICATION,
  medication,
});

export const fetchMedication = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/medications/${id}`);
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
        `${API_URL}/api/medications/${medication.id}`,
        updatedMedication
      );
      dispatch(getSingleMedication(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMedId = (medName) => {
  return async () => {
    try {
      const { data } = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${medName}`
      );
      console.log(data.idGroup.rxnormId[0]);
      return data.idGroup.rxnormId[0];
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
