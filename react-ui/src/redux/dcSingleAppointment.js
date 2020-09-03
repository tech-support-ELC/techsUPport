import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = {};
const GET_SINGLE_TODAY_APPOINTMENT = 'GET_SINGLE_TODAY_APPOINTMENT';

export const getSingleTodayAppointment = singleTodayAppointment => {
  return {
    type: GET_SINGLE_TODAY_APPOINTMENT,
    singleTodayAppointment
  }
}
export const getSingleTodayAppointmentThunk = (id) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcappointment/${id}`);
      dispatch(getSingleTodayAppointment(data));
    } catch (error) {
      console.error(error);
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_TODAY_APPOINTMENT:
      return action.singleTodayAppointment;
    default:
      return state;
  }
}
