export default {
  form: {
    formName: 'notification',
    inputs: {
      title: {
        label: 'Notification Title',
        name: 'title',
        type: 'text'
      },
      body: {
        label: 'Notification Body',
        name: 'body',
        type: 'text'
      },
      type: {
        name: 'type',
        type: 'hidden'
      }
    },
    action: '/pushes',
    method: 'post',
    submit: 'Push'
  }
}