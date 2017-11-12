import { actionTypes } from '../actions'
const FORM_NAME = 'signup'
const initialState = {
  username: '',
  accesstoken: ''
}

const signupForm = (state = initialState, action = {}) => {
  let { type, name, value } = action

  switch (type) {
    case actionTypes.SIGNUP_INPUT_CHANGE:
      return Object.assign({}, state, { [name]: value })
    case actionTypes.USER_REGISTERED_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default signupForm