import axios from "axios";
import { API_URL } from "./API_URL";
import { updateAllMeds } from "./medications";

const GET_MEDICATION = "GET_MEDICATION";
const UPDATED_MEDICATION = "UPDATED_MEDICATION";
const GET_ID = "GET_ID";

const initialState = {};

const getSingleMedication = (medication) => ({
  type: GET_MEDICATION,
  medication,
});

const getMedId = (medId) => ({
  type: GET_ID,
  medId,
});

const updateSingleMedication = (id, medication) => ({
  type: UPDATED_MEDICATION,
  id,
  medication,
});

export const fetchMedId = (medName) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `https://rxnav.nlm.nih.gov/REST/rxcui.json?name=${medName}`
      );
      console.log(data.idGroup.rxnormId[0]);
      dispatch(getMedId(data.idGroup.rxnormId[0]));
    } catch (error) {
      console.log(error);
    }
  };
};

export const fetchMedication = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/medications/${id}`);
      dispatch(getSingleMedication(data));
      dispatch(fetchMedId(data.name));
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
      console.log("update", data);
      dispatch(updateSingleMedication(data.id, data));
      dispatch(updateAllMeds(data.id, data));
    } catch (error) {
      console.log(error);
    }
  };
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MEDICATION:
      return { ...state, medication: action.medication };
    case UPDATED_MEDICATION:
      let updated = { ...state };
      updated.name = action.medication.name;
      updated.dosage = action.medication.dosage;
      updated.frequency = action.medication.frequency;
      return { ...state, medication: updated };
    case GET_ID:
      return { ...state, rxcui: action.medId };
    default:
      return state;
  }
}
