import axios from 'axios';
const initialState = [];

const GET_ALL_CONDITIONS = 'GET_ALL_CONDITIONS';
const ADD_CONDITION = 'ADD_CONDITION';
const DELETE_CONDITION = 'DELETE_CONDITION';
const UPDATE_CONDITIONS_LIST = 'UPDATE_CONDITIONS_LIST';
const getAllConditions = conditions => {
  return {
    type: GET_ALL_CONDITIONS,
    conditions
  }
}
const addCondition = condition => {
  return {
    type: ADD_CONDITION,
    condition
  }
}
const deleteCondition = id => {
  return {
    type: DELETE_CONDITION,
    id
  }
}
export const updateAllConditions = (id, condition) => {
  return {
      type: UPDATE_CONDITIONS_LIST,
      id,
      condition
  }
}
export const getAllConditionsThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/conditions/');
      dispatch(getAllConditions(data));
    } catch (error) {
      console.log(error)
    }
  }
}
export const addConditionThunk = (condition) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/conditions', condition);
      dispatch(addCondition(data));
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteConditionThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/conditions/${id}`);
      dispatch(deleteCondition(id));
      const {data} = await axios.get('/api/conditions/');
      dispatch(getAllConditions(data));
    } catch (err) {
      console.log(err);
    }
  };
};
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_CONDITIONS:
      return action.conditions
    case ADD_CONDITION:
      return [...state, action.condition]
    case DELETE_CONDITION:
      return state.filter(condition => condition.id !== action.id);
    case UPDATE_CONDITIONS_LIST:
      return [...state].map((condition) => {
          if (condition.id === action.id) {
              return action.condition
          } else {
              return condition
          }
      })
    default:
      return state
  }
}
