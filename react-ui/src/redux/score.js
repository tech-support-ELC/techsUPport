import axios from 'axios';
import { API_URL } from './API_URL';
const initialState = [];

const GET_CHART = 'GET_CHART';

const getChart = chart => {
  return {
    type: GET_CHART,
    chart
  }
}

export const getChartThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/score`)
      dispatch(getChart(data.slice(-60)))
    } catch (error) {
      console.error(error)
    }
  }
}
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CHART:
      return action.chart
    default:
      return state
  }
}
