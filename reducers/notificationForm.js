import { actionTypes } from '../actions'
const FORM_NAME = 'signup'
const initialState = {
  title: 'title',
  body: 'body',
  type: 'note'
}

const notificationForm = (state = initialState, action = {}) => {
  let { type, name, value } = action

  switch (type) {
    case actionTypes.NOTIFICATION_INPUT_CHANGE:
      return Object.assign({}, state, { [name]: value })
    
    default:
      return state
  }
}

export default notificationForm