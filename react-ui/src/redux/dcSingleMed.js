import axios from 'axios';
const initialState = {};
const GET_SINGLE_TODAY_MEDS = 'GET_SINGLE_TODAY_MEDS';

export const getSingleTodayMeds = singleTodayMeds => {
  return {
    type: GET_SINGLE_TODAY_MEDS,
    singleTodayMeds
  }
}
export const getSingleTodayMedsThunk = (id) => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/dailycheckin/dcmeds/${id}`);
      dispatch(getSingleTodayMeds(data));
    } catch (error) {
      console.error(error);
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_SINGLE_TODAY_MEDS:
      return action.singleTodayMeds;
    default:
      return state;
  }
}
