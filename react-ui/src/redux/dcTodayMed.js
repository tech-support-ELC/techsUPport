import axios from 'axios';
// import { API_URL } from './API_URL';
const initialState = [];

const GET_TODAY_MEDS = 'GET_TODAY_MEDS';
const UPDATE_TODAY_MED = 'UPDATE_TODAY_MED';

export const getTodayMeds = todayMed => {
  return {
    type: GET_TODAY_MEDS,
    todayMed
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

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_MEDS:
      return action.todayMed;
    case UPDATE_TODAY_MED:
      let updated = { ...state.todayMed };
      updated.name = action.todayMed.name;
      updated.notes = action.todayMed.notes;
      return updated;
    default:
      return state;
  }
}
