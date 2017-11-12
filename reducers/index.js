import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { actionTypes } from '../actions'
import message from './message'
import currentUser from './currentUser'
import signupForm from './signupForm'
import notificationForm from './notificationForm'
import users from './users'
import logger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'


const reducer = combineReducers({
  message,
  currentUser,
  signupForm,
  notificationForm,
  users
})

export const initStore = (initialState = {}) => {
  return createStore(reducer, initialState, compose(applyMiddleware(thunkMiddleware), applyMiddleware(logger)))
}

export default reducer

