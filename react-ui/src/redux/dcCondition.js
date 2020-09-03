import axios from 'axios';
import { getTodayScore } from './dcTodayScore';
const initialState = [];

const GET_SCORE = 'GET_SCORE';
const ADD_SCORE = 'ADD_SCORE';

const getScore = score => {
  return {
    type: GET_SCORE,
    score
  }
}
const addScore = score => {
  return {
    type: ADD_SCORE,
    score
  }
}

export const getScoreThunk = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get(`/api/dailycheckin/score`)
      dispatch(getScore(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addScoreThunk = (rate, date, notes) => {
  return async dispatch => {
    try {
      const { data } = await axios.post(`/api/dailycheckin/score`, { rate, date, notes });
      const newData = await axios.get(`/api/conditions`);
      const allData = await axios.get(`/api/dailycheckin/dcscore`);
      dispatch(addScore(data));
      dispatch(getScore(newData.data));
      dispatch(getTodayScore(allData.data));
    } catch (error) {
      console.error(error);
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_SCORE:
      return action.score;
    case ADD_SCORE:
      return [
        ...state,
        action.score
      ];
    default:
      return state;
  }
}
