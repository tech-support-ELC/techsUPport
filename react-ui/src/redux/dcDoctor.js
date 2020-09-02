import axios from 'axios';
import { API_URL } from './API_URL';
import { getTodayAppointment } from './dcTodayAppointment';
const initialState = [];

const GET_APPOINTMENT = 'GET_APPOINTMENT';
const ADD_APPOINTMENT = 'ADD_APPOINTMENT';

const getAppointment = appointment => {
  return {
    type: GET_APPOINTMENT,
    appointment
  }
}
const addAppointment = appointment => {
  return {
    type: ADD_APPOINTMENT,
    appointment
  }
}

export const getAppointmentThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`${API_URL}/api/doctors`);
      console.log('data inside get appointment thunk', data);
      dispatch(getAppointment(data));
    } catch (error) {
      console.error(error)
    }
  }
}
export const addAppointmentThunk = (appointmentDate) => {
  console.log('appointment date inside add appointment thunk', appointmentDate)
  return async dispatch => {
    try {
      const { data } = await axios.post(`${API_URL}/api/dailycheckin/appointment`, { appointmentDate });
      const newData = await axios.get(`${API_URL}/api/doctors`);
      const allData = await axios.get(`${API_URL}/api/dailycheckin/dcappointment`);
      dispatch(addAppointment(data));
      dispatch(getAppointment(newData.data));
      dispatch(getTodayAppointment(allData.data));
    } catch (error) {
      console.error(error);
    }
  }
}
export default function (state = initialState, action) {
  switch (action.type) {
    case GET_APPOINTMENT:
      return action.appointment;
    case ADD_APPOINTMENT:
      return [
        ...state,
        action.appointment
      ];
    default:
      return state;
  }
}
