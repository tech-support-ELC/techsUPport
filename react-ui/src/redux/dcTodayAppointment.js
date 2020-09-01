import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = [];

const GET_TODAY_APPOINTMENT = 'GET_TODAY_APPOINTMENT';

export const getTodayAppointment = todayAppointment => {
  return {
    type: GET_TODAY_APPOINTMENT,
    todayAppointment
  }
}

export const getTodayAppointmentThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcappointment`)
      dispatch(getTodayAppointment(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_APPOINTMENT:
      return action.todayAppointment
    default:
      return state
  }
}
