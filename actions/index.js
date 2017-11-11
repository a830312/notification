import request from 'superagent'
import { get as _get } from 'lodash'

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  SIGNUP: 'SIGNUP',
  INPUT_CHANGE: 'INPUT_CHANGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  USER_REGISTERED_SUCCESS: 'USER_REGISTERED_SUCCESS',
  USER_REGISTERED_ERROR: 'USER_REGISTERED_ERROR'
}

// ACTIONS
export const serverRenderClock = (isServer) => dispatch => {
  return dispatch({ type: actionTypes.TICK, light: !isServer, ts: Date.now() })
}

export const startClock = () => dispatch => {
  return setInterval(() => dispatch({ type: actionTypes.TICK, light: true, ts: Date.now() }), 800)
}

export const addCount = () => dispatch => {
  return dispatch({ type: actionTypes.ADD })
}

export const signup = (username, accesstoken) => dispatch => {
  return dispatch({
    type: actionTypes.SIGNUP,
    username: username,
    accesstoken: accesstoken
  })
}

export const handleSignupInputChange = (name, value) => dispatch => {
  return dispatch({
    type: actionTypes.INPUT_CHANGE,
    name,
    value
  })
}

const sendSignupRequest = ({ username, accesstoken }) => (dispatch) => {
  return request
    .post('/signup')
    .send({ username, accesstoken })
    .set('Content-Type', 'application/json')
    .then((success, failure) => {
      if (failure)
        return dispatch({ type: actionTypes.USER_REGISTERED_ERROR })

      return dispatch({
        type: actionTypes.USER_REGISTERED_SUCCESS,
        user: _get(success, 'body.user', {})
      })
    })
}

const updateMessage = (message) => dispatch => {
  return dispatch({
    type: actionTypes.UPDATE_MESSAGE,
    message
  })
}

export const handleSignupFormSubmit = ({username, accesstoken}) => (dispatch) => {
  if (!username || !accesstoken) {
    return dispatch(updateMessage('username & accesstoken are required fields'))
  }
  
  return dispatch(sendSignupRequest({username, accesstoken}))
    .then(dispatch(updateMessage(`${username} registered`)))

  
}