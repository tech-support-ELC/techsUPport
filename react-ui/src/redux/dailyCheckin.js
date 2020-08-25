import axios from 'axios';
const initialState = [];
const DAILY_CHECKIN = 'DAILY_CHECKIN';
const ADD_SCORE = 'ADD_SCORE';
const getScore = score => {
  return {
    type: DAILY_CHECKIN,
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
      const {data} = await axios.get('/api/dailycheckin/score')
      dispatch(getScore(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export const addScoreThunk = (value, date, notes) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/dailycheckin/score', {value, date, notes})
      dispatch(addScore(data))
    } catch (error) {
      console.error(error)
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case DAILY_CHECKIN:
      return action.score

    case ADD_SCORE:
      return [
        ...state,
        ...action.score
      ]
    default:
      return state
  }
}
