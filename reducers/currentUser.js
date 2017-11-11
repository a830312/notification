import { actionTypes } from '../actions'

const initialState = null

const currentUser = (state = initialState, action = {}) => {
  let { type, user } = action
  switch (type) {
    case actionTypes.USER_REGISTERED_SUCCESS:
      return user
    default:
      return state
  }
}

export default currentUser