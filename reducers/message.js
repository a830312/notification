import { actionTypes } from '../actions'

const initialState = ''

const message = (state = initialState, action = {}) => {
  let { type, message } = action
  switch (type) {
    case actionTypes.UPDATE_MESSAGE:
      return message
    
    default:
      return state
  }
}

export default message