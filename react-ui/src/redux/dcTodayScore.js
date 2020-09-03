import axios from 'axios';
const initialState = [];

const GET_TODAY_SCORE = 'GET_TODAY_SCORE';
const UPDATE_TODAY_SCORE = 'UPDATE_TODAY_SCORE';

export const getTodayScore = todayScore => {
  return {
    type: GET_TODAY_SCORE,
    todayScore
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
      const { data } = await axios.get(`/api/dailycheckin/dcscore`);
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
      const { data } = await axios.put(
        `/api/dailycheckin/dcscore/${id}`,
        todayScore
      );
      const allData = await axios.get(`/api/dailycheckin/dcscore`);
      dispatch(updateTodayScore(data));
      dispatch(getTodayScore(allData.data));
    } catch (error) {
      console.log(error);
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODAY_SCORE:
      return action.todayScore;
    case UPDATE_TODAY_SCORE:
      let updated = { ...state.todayScore };
      updated.name = action.todayScore.name;
      updated.rate = action.todayScore.rate;
      updated.notes = action.todayScore.notes;
      return updated;
    default:
      return state;
  }
}
