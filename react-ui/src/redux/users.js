import axios from 'axios'
import { API_URL } from './API_URL';
/* -----------------    ACTION TYPES    ------------------ */

const INITIALIZE = 'INITIALIZE_USERS'
const CREATE = 'CREATE_USER'
export const REMOVE = 'REMOVE_USER'
const UPDATE = 'UPDATE_USER'
const GET_USERS = 'GET_USERS'
/* ------------     ACTION CREATORS      ------------------ */

const init = users => ({ type: INITIALIZE, users })
export const create = user => ({ type: CREATE, user })
const remove = id => ({ type: REMOVE, id })
const update = user => ({ type: UPDATE, user })
const getAllUsers = users => {
  return {
    type: GET_USERS,
    users
  }
}
export const getUsersThunk = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`${API_URL}/api/users`);
      console.log(data)
      dispatch(getAllUsers(data));
    } catch (error) {
      console.log(error)
    }
  }
}
export const deleteUserThunk = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/users/${id}`);
      dispatch(remove(id));
      const {data} = await axios.get(`${API_URL}/api/users`);
      dispatch(getAllUsers(data));
    } catch (err) {
      console.log(err);
    }
  };
};
/* ------------          REDUCER         ------------------ */

export default function reducer(users = [], action) {
  switch (action.type) {
    case INITIALIZE:
      return action.users

    case CREATE:
      return [action.user, ...users]

    case REMOVE:
      return users.filter(user => user.id !== action.id)

    case UPDATE:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ))
    case GET_USERS:
      return action.users

    default:
      return users
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
    .then(res => dispatch(init(res.data)))
}

export const removeUser = id => dispatch => {
  axios.delete(`/api/users/${id}`)
    .then(() => dispatch(remove(id)))
    .catch(err => console.error(`Removing user: ${id} unsuccesful`, err))
}

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
    .then(res => dispatch(create(res.data)))
    .catch(err => console.error(`Creating user: ${user} unsuccesful`, err))
}

export const updateUser = (id, user) => dispatch => {
  axios.put(`/api/users/${id}`, user)
    .then(res => dispatch(update(res.data)))
    .catch(err => console.error(`Updating user: ${user} unsuccesful`, err))
}
