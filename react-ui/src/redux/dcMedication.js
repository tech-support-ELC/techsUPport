import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = [];

const GET_MEDICATION = 'GET_MEDICATION';
const ADD_MEDICATION = 'ADD_MEDICATION';

const getMedication = med => {
  return {
    type: GET_MEDICATION,
    med
  }
}
const addMedication = med => {
  return {
    type: ADD_MEDICATION,
    med
  }
}

export const getMedicationThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/meds`)
      console.log(data)
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
    case GET_MEDICATION:
      return action.med
    case ADD_MEDICATION:
      return [
        ...state,
        action.med
      ]
    default:
      return state
  }
}
