import request from 'superagent'
import { get as _get } from 'lodash'

export const actionTypes = {
  SIGNUP: 'SIGNUP',
  SIGNUP_INPUT_CHANGE: 'SIGNUP_INPUT_CHANGE',
  NOTIFICATION_INPUT_CHANGE: 'NOTIFICATION_INPUT_CHANGE',
  UPDATE_MESSAGE: 'UPDATE_MESSAGE',
  USER_REGISTERED_SUCCESS: 'USER_REGISTERED_SUCCESS',
  USER_REGISTERED_ERROR: 'USER_REGISTERED_ERROR',
  PUSH_USER_SUCCESS: 'PUSH_USER_SUCCESS',
  PUSH_USER_ERROR: 'PUSH_USER_ERROR',
  LIST_USERS_SUCCESS: 'LIST_USERS_SUCCESS',
  LIST_USERS_ERROR: 'LIST_USERS_ERROR'
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
    return dispatch({
      type: actionTypes.USER_REGISTERED_ERROR,
      message: 'username & accesstoken are required'
    })
            
  
  return dispatch(sendSignupRequest({username, accesstoken}))
          .then((success, failure) => {

            if (failure)
              return dispatch({
                type: actionTypes.USER_REGISTERED_ERROR,
                message: 'cannot signup now, please try again later'
              })
                      

            return dispatch({
              type: actionTypes.USER_REGISTERED_SUCCESS,
              user: _get(success, 'body', {})
            })
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
    return dispatch({
      type: actionTypes.PUSH_USER_ERROR,
      message: 'title and body for notification are required'
    })

  return dispatch(pushNotification({ title, body, type, username }))
          .then((success, failure) => {
            if (failure)
              return dispatch({
                type: actionTypes.PUSH_USER_ERROR,
                message: `failed to push to ${username}`
              })

            return dispatch({
              type: actionTypes.PUSH_USER_SUCCESS,
              user: _get(success, 'body', {}),
              message: `${username} has been updated`
            })
          })
}

const sendGetUserListRequest = () => (dispatch) => {
  return request.get('http://localhost:3000/list-users')
}

export const getUserList = () => (dispatch) => {
  return dispatch(sendGetUserListRequest())
    .then((success, failure) => {

      if (failure)
        return dispatch({
          type: actionTypes.LIST_USERS_ERROR,
          message: 'failed to list users'
        })

      return dispatch({
        type: actionTypes.LIST_USERS_SUCCESS,
        users: _get(success, 'body', [])
      })
    })
}