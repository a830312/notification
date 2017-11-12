export default {
  form: {
    formName: 'signup',
    inputs: {
      username: {
        label: 'username',
        name: 'username',
        type: 'text'
      },
      accesstoken: {
        label: 'accesstoken',
        name: 'accesstoken',
        type: 'text'
      }
    },
    action: '/signup',
    method: 'post'
  }
}
