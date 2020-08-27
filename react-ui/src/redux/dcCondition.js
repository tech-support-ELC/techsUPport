import axios from 'axios';
import { API_URL } from './API_URL';
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
      const {data} = await axios.get(`${API_URL}/api/dailycheckin/score`)
      dispatch(getScore(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addScoreThunk = (rate, date, notes) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`${API_URL}/api/dailycheckin/score`, {rate, date, notes})
      dispatch(addScore(data))
    } catch (error) {
      console.error(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SCORE:
      return action.score
    case ADD_SCORE:
      return [
        ...state,
        action.score
      ]
    default:
      return state
  }
}
