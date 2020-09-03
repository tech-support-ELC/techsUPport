import axios from 'axios';
import { API_URL } from './API_URL';
import { getSingleTodayScore } from './dcSingleScore';
const initialState = [];

const GET_TODAY_SCORE = 'GET_TODAY_SCORE';
const UPDATE_TODAY_SCORE = 'UPDATE_TODAY_SCORE';
const DELETE_TODAY_SCORE = 'DELETE_TODAY_SCORE';

export const getTodayScore = todayScore => {
  return {
    type: GET_TODAY_SCORE,
    todayScore
  }
}
const deleteTodayScore = id => {
  return {
    type: DELETE_TODAY_SCORE,
    id
  }
}
const updateTodayScore = todayScore => {
  return {
    type: UPDATE_TODAY_SCORE,
    todayScore
  }
}
export const getTodayScoreThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcscore`);
      dispatch(getTodayScore(data));
    } catch (error) {
      console.error(error);
    }
  }
}

export const updateTodayScoreThunk = (
  id,
  todayScore
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `${API_URL}/api/dailycheckin/dcscore/${id}`,
        todayScore
      );
      const allData = await axios.get(`${API_URL}/api/dailycheckin/dcscore`);
      dispatch(updateTodayScore(data));
      dispatch(getTodayScore(allData.data));
      const newData = await axios.get(`${API_URL}/api/dailycheckin/dcscore/${id}`);
      dispatch(getSingleTodayScore(newData.data));
    } catch (error) {
      console.log(error);
    }
  }
}
export const deleteTodayScoreThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/dailycheckin/dcscore/${id}`);
      dispatch(deleteTodayScore(id));
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcscore`);
      dispatch(getTodayScore(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_SCORE:
      return action.todayScore;
    case UPDATE_TODAY_SCORE:
      let updated = { ...state.todayScore };
      updated.name = action.todayScore.name;
      updated.rate = action.todayScore.rate;
      updated.notes = action.todayScore.notes;
      return updated;
    case DELETE_TODAY_SCORE:
      return state.filter(todayScore => todayScore.id !== action.id);
    default:
      return state;
  }
}
