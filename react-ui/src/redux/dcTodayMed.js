import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = [];

const GET_TODAY_MEDS = 'GET_TODAY_MEDS';

export const getTodayMeds = todayMed => {
  return {
    type: GET_TODAY_MEDS,
    todayMed
  }
}

export const getTodayMedsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcmeds`)
      dispatch(getTodayMeds(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_MEDS:
      return action.todayMed
    default:
      return state
  }
}
