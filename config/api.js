const HOST = process.env.HOST || 'http://localhost:3000'

const LIST_USERS_API = `${HOST}/list-users`
const SIGNUP_API = `${HOST}/signup`
const LOGIN_API = `${HOST}/login`
const LOGOUT_API = `${HOST}/logout`
const PUSHES_API = `${HOST}/pushes`

export { LIST_USERS_API, SIGNUP_API, LOGIN_API, LOGOUT_API, PUSHES_API }