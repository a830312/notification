import { isObject as _isObject } from 'lodash'

const extraceUserData = (user) => {
  if (!_isObject(user))
    return {}

  let { username, accessToken, creationTime, numOfNotificationsPushed } = user

  return {
    username,
    accessToken,
    creationTime,
    numOfNotificationsPushed
  }

}

export { extraceUserData }