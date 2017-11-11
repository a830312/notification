import { actionTypes } from '../actions'

const initialState = false

const hasSignup = (state = initialState, action = {}) => {
  let { type, name, value } = action
  switch (type) {
    case actionTypes.USER_REGISTERED_SUCCESS:
      return true
    case actionTypes.USER_REGISTERED_ERROR:
      return false
    default:
      return state
  }
}

export default hasSignup