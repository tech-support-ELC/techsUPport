import axios from 'axios';
const initialState = {};
const GET_SINGLE_TODAY_SCORE = 'GET_SINGLE_TODAY_SCORE';

export const getSingleTodayScore = singleTodayScore => {
  return {
    type: GET_SINGLE_TODAY_SCORE,
    singleTodayScore
  }
}
export const getSingleTodayScoreThunk = (id) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/dailycheckin/dcscore/${id}`);
      dispatch(getSingleTodayScore(data));
    } catch (error) {
      console.error(error);
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_TODAY_SCORE:
      return action.singleTodayScore;
    default:
      return state;
  }
}
