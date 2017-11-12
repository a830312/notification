import { actionTypes } from '../actions'

const initialState = []

const users = (state = initialState, action = {}) => {
  let { type, users } = action
  switch (type) {
    case actionTypes.LIST_USERS_SUCCESS:
      return users || state || initialState
    default:
      return state
  }
}

export default users