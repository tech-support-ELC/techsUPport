import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = [];

const GET_TODAY_SCORE = 'GET_TODAY_SCORE';

export const getTodayScore = todayScore => {
  return {
    type: GET_TODAY_SCORE,
    todayScore
  }
}

export const getTodayScoreThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/dcscore`)
      dispatch(getTodayScore(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_SCORE:
      return action.todayScore
    default:
      return state
  }
}
