import request from 'superagent'
import { get as _get } from 'lodash'

export const actionTypes = {
  ADD: 'ADD',
  TICK: 'TICK',
  SIGNUP: 'SIGNUP',
  SIGNUP_INPUT_CHANGE: 'SIGNUP_INPUT_CHANGE',
  NOTIFICATION_INPUT_CHANGE: 'NOTIFICATION_INPUT_CHANGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  USER_REGISTERED_SUCCESS: 'USER_REGISTERED_SUCCESS',
  USER_REGISTERED_ERROR: 'USER_REGISTERED_ERROR',
  PUSH_USER_SUCCESS: 'PUSH_USER_SUCCESS',
  PUSH_USER_ERROR: 'PUSH_USER_ERROR'
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

export const handleSignupInputChange = ({name, value}) => dispatch => {
  return dispatch({
    type: actionTypes.SIGNUP_INPUT_CHANGE,
    name,
    value
  })
}

export const handlePushesInputChange = ({name, value}) => dispatch => {
  return dispatch({
    type: actionTypes.NOTIFICATION_INPUT_CHANGE,
    name,
    value
  })
}

const sendSignupRequest = ({ username, accesstoken }) => (dispatch) => {
  return request
    .post('/signup')
    .send({ username, accesstoken })
    .set('Content-Type', 'application/json')
    
}

const updateMessage = (message) => dispatch => {
  return dispatch({
    type: actionTypes.UPDATE_MESSAGE,
    message
  })
}

export const handleSignupFormSubmit = () => (dispatch, getState) => {
  let storeState = getState(),
      signupForm = storeState.signupForm,
      { username, accesstoken } = signupForm

  if (!username || !accesstoken)
    return dispatch(updateMessage('username & accesstoken are required'))
  
  return dispatch(sendSignupRequest({username, accesstoken}))
    .then((success, failure) => {
      console.log('---sendSignupRequest---', success, failure)
      if (failure)
        return dispatch({ type: actionTypes.USER_REGISTERED_ERROR })

      return dispatch({
        type: actionTypes.USER_REGISTERED_SUCCESS,
        user: _get(success, 'body.user', {})
      })
    })
    .catch((err) => {
      console.log(err)
    })
}

const pushNotification = ({ title, body, type, username }) => (dispatch) => {
  return request
    .post('/pushes')
    .send({ title, body, type, username })
    .set('Content-Type', 'application/json')
    
}

export const handleNotificationFormSubmit = () => (dispatch, getState) => {
  let storeState = getState(),
      { notificationForm, currentUser } = storeState,
      { title, body, type } = notificationForm,
      { username } = currentUser

  if (!title || !body)
    return dispatch(updateMessage('title and body for notification are required'))

  return dispatch(pushNotification({ title, body, type, username }))
    .then((success, failure) => {
      if (failure)
        return dispatch({ type: actionTypes.PUSH_USER_ERROR })

      return dispatch({
        type: actionTypes.PUSH_USER_SUCCESS,
        user: _get(success, 'body.user', {})
      })
    })
}