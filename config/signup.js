export default {
  form: {
    formName: 'signup',
    inputs: [
      {
        label: 'username',
        name: 'username',
        type: 'text'
      },
      {
        label: 'accesstoken',
        name: 'accesstoken',
        type: 'text'
      }
    ],
    action: '/signup',
    method: 'post'
  }
}
