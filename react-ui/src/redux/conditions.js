import axios from 'axios';
const initialState = [];

const GET_ALL_CONDITIONS = 'GET_ALL_CONDITIONS';
const ADD_CONDITION = 'ADD_CONDITION';
const UPDATE_CONDITION = 'UPDATE_CONDITION';
const DELETE_CONDITION = 'DELETE_CONDITION';
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
const updateCondition = condition => {
  return {
    type: UPDATE_CONDITION,
    name: condition.name,
    diagnosed: condition.diagnosed,
    typeOfPain: condition.typeOfPain
  }
}
const deleteCondition = id => {
  return {
    id
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
export const updateConditionThunk = (
  id,
  name,
  diagnosed,
  typeOfPain
) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(
        `/api/conditions/${id}`,
        name,
        diagnosed,
        typeOfPain
      )
      dispatch(updateCondition(data))
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
    case UPDATE_CONDITION:
      return [...state, action.condition]
    case DELETE_CONDITION:
      return state.filter(condition => condition.id !== action.id);
    default:
      return state
  }
}
