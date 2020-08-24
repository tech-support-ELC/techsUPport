import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER'

/* ------------     ACTION CREATORS      ------------------ */

const setCurrentUser = user => ({ type: SET_CURRENT_USER, user })
const removeCurrentUser = () => ({ type: REMOVE_CURRENT_USER })

/* ------------          REDUCER         ------------------ */

export default function reducer(currentUser = {}, action) {
  switch (action.type) {

    case SET_CURRENT_USER:
      return action.user

    case REMOVE_CURRENT_USER:
      return {}

    default:
      return currentUser
  }
}

/* ------------       THUNK CREATORS     ------------------ */

export const login = (credentials, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/auth/local/login', credentials)
      setUserAndRedirect(data, history, dispatch)
    } catch (err) {
      console.error(`Logging in with ${credentials.email} was unsuccesful`, err)
    }
  }
}

export const logout = history => {
  return async dispatch => {
    try {
      await axios.delete('/auth/local/logout')
      dispatch(removeCurrentUser())
      history.push('/login')
    } catch (err) {
      console.error('Logging out was unsuccesful', err)
    }
  }
}


export const signup = (credentials, history) => {
  return async dispatch => {
    try {
      const { data } = await axios.post('/auth/local/signup', credentials)
      setUserAndRedirect(data, history, dispatch)
    } catch (err) {
      console.error(`Signing up with ${credentials.email} was unsuccesful`, err)
    }
  }
}

export const fetchCurrentUser = () => {
  return async dispatch => {
    try {
      const { data } = await axios.get('/auth/local/me')
      dispatch(setCurrentUser(data))
    } catch (err) {
      console.error('Fetching current user failed', err)
    }
  }
}

/* ------------      HELPER FUNCTIONS     ------------------ */

function setUserAndRedirect(user, history, dispatch) {
  console.log('setUserAndRedirect')
  dispatch(setCurrentUser(user))
  history.push(`/`)
}
