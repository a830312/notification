import { actionTypes } from '../actions'

const FORM_NAME = 'signup'
const initialState = {
  title: '',
  body: '',
  type: 'note'
}

const notificationForm = (state = initialState, action = {}) => {
  let { type, name, value } = action

  switch (type) {
    case actionTypes.NOTIFICATION_INPUT_CHANGE:
      return Object.assign({}, state, { [name]: value })
    case actionTypes.PUSH_USER_SUCCESS:
      return initialState
    default:
      return state
  }
}

export default notificationForm