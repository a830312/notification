import { actionTypes } from '../actions'

const initialState = ''

const message = (state = initialState, action = {}) => {
  let { type, message } = action
  switch (type) {
    case actionTypes.UPDATE_MESSAGE:
    case actionTypes.PUSH_USER_SUCCESS:
    case actionTypes.PUSH_USER_ERROR:
    case actionTypes.LIST_USERS_ERROR:
    case actionTypes.USER_REGISTERED_ERROR:
      return message
    default:
      return state
  }
}

export default message