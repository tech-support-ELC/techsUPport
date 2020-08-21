import axios from 'axios';
const initialState = [];

const GET_ALL_CONDITIONS = 'GET_ALL_CONDITIONS';

const getAllConditions = conditions => {
  return {
    type: GET_ALL_CONDITIONS,
    conditions
  }
}
export const getAllConditionsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/conditions');
      dispatch(getAllConditions(data));
    } catch (error) {
      console.log(error)
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONDITIONS:
      return action.conditions
    default:
      return state
  }
}
