import axios from 'axios';
import { getSingleTodayMeds } from './dcSingleMed';

const initialState = [];

const GET_TODAY_MEDS = 'GET_TODAY_MEDS';
const UPDATE_TODAY_MED = 'UPDATE_TODAY_MED';
const DELETE_TODAY_MED = 'DELETE_TODAY_MED';

export const getTodayMeds = todayMed => {
  return {
    type: GET_TODAY_MEDS,
    todayMed
  }
}
const deleteTodayMed = id => {
  return {
    type: DELETE_TODAY_MED,
    id
  }
}
const updateTodayMed = todayMed => {
  return {
    type: UPDATE_TODAY_MED,
    todayMed
  }
}
export const updateTodayMedThunk = (
  id,
  todayMed
) => {
  return async dispatch => {
    try {
      const { data } = await axios.put(
        `/api/dailycheckin/dcmeds/${id}`,
        todayMed
      );
      const allData = await axios.get(`/api/dailycheckin/dcmeds`);
      dispatch(updateTodayMed(data));
      dispatch(getTodayMeds(allData.data));
      const newData = await axios.get(`/api/dailycheckin/dcmeds/${id}`);
      dispatch(getSingleTodayMeds(newData.data));
    } catch (error) {
      console.log(error);
    }
  }
}
export const getTodayMedsThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/dailycheckin/dcmeds`);
      dispatch(getTodayMeds(data));
    } catch (error) {
      console.error(error)
    }
  }
}

export const deleteTodayMedThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/dailycheckin/dcmeds/${id}`);
      dispatch(deleteTodayMed(id));
      const { data } = await axios.get(`/api/dailycheckin/dcmeds`);
      dispatch(getTodayMeds(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export default function (state = initialState, action) {

  switch (action.type) {
    case GET_TODAY_MEDS:
      return action.todayMed;
    case UPDATE_TODAY_MED:
      let updated = { ...state.todayMed };
      updated.name = action.todayMed.name;
      updated.notes = action.todayMed.notes;
      return updated;
    case DELETE_TODAY_MED:
      return state.filter(todayMed => todayMed.id !== action.id);
    default:
      return state;
  }
}
