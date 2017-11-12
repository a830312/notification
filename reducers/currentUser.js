import { actionTypes } from '../actions'

const initialState = {}

const currentUser = (state = initialState, action = {}) => {
  let { type, user } = action
  switch (type) {
    case actionTypes.USER_LOGIN_SUCCESS:
    case actionTypes.PUSH_USER_SUCCESS:
    case actionTypes.USER_REGISTERED_SUCCESS:
      return user || state
    default:
      return state
  }
}

export default currentUser