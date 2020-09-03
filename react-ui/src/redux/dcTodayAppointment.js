import axios from 'axios';
import { API_URL } from './API_URL';
import { getSingleTodayAppointment } from './dcSingleAppointment';
const initialState = [];

const GET_TODAY_APPOINTMENT = 'GET_TODAY_APPOINTMENT';
const UPDATE_TODAY_APPOINTMENT = 'UPDATE_TODAY_APPOINTMENT';
const DELETE_TODAY_APPOINTMENT = 'DELETE_TODAY_APPOINTMENT';

export const getTodayAppointment = todayAppointment => {
  return {
    type: GET_TODAY_APPOINTMENT,
    todayAppointment
  }
}
const deleteTodayAppointment = id => {
  return {
    type: DELETE_TODAY_APPOINTMENT,
    id
  }
}
const updateTodayAppointment = todayAppointment => {
  return {
    type: UPDATE_TODAY_APPOINTMENT,
    todayAppointment
  }
}

export const getTodayAppointmentThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcappointment`);
      dispatch(getTodayAppointment(data));
    } catch (error) {
      console.error(error)
    }
  }
}
export const updateTodayAppointmentThunk = (
  id,
  todayAppointment
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `${API_URL}/api/dailycheckin/dcappointment/${id}`,
        todayAppointment
      );
      const allData = await axios.get(`${API_URL}/api/dailycheckin/dcappointment`);
      dispatch(updateTodayAppointment(data));
      dispatch(getTodayAppointment(allData.data));
      const newData= await axios.get(`${API_URL}/api/dailycheckin/dcappointment/${id}`);
      dispatch(getSingleTodayAppointment(newData.data));
    } catch (error) {
      console.log(error)
    }
  }
}
export const deleteTodayAppointmentThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/dailycheckin/dcappointment/${id}`);
      dispatch(deleteTodayAppointment(id));
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcappointment`);
      dispatch(getTodayAppointment(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_APPOINTMENT:
      return action.todayAppointment;
    case UPDATE_TODAY_APPOINTMENT:
      let updated = { ...state.todayAppointment }
      updated.firstName = action.todayAppointment.firstName;
      updated.lastName = action.todayAppointment.lastName;
      updated.time = action.todayAppointment.time;
      return updated;
    case DELETE_TODAY_APPOINTMENT:
      return state.filter(todayAppointment => todayAppointment.id !== action.id);
    default:
      return state;
  }
}
