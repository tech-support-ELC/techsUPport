import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = [];

const GET_MEDS = 'GET_MEDS';
const ADD_MEDS = 'ADD_MEDS';

const getMedication = med => {
  return {
    type: GET_MEDS,
    med
  }
}
const addMedication = med => {
  return {
    type: ADD_MEDS,
    med
  }
}

export const getMedicationThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/medications`)
      dispatch(getMedication(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addMedicationThunk = (notes) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`${API_URL}/api/dailycheckin/meds`, {notes})
      dispatch(addMedication(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MEDS:
      return action.med
    case ADD_MEDS:
      return [
        ...state,
        action.med
      ]
    default:
      return state
  }
}
