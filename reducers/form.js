import { actionTypes } from '../actions'

const initialState = {
  username: '',
  accessToken: ''
}

const form = (state = initialState, action = {}) => {
  let { type, name, value } = action
  switch (type) {
    case actionTypes.INPUT_CHANGE:
      return Object.assign({}, state, { username, accessToken })
    
    default:
      return state
  }
}

export default form