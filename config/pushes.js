export default {
  form: {
    formName: 'pushes',
    inputs: [
      {
        label: 'title',
        name: 'title',
        type: 'text'
      },
      {
        label: 'body',
        name: 'body',
        type: 'text'
      },
      {
        name: 'type',
        type: 'hidden'
      }
    ],
    action: '/pushes',
    method: 'post',
    submit: 'Push'
  }
}