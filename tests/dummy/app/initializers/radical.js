export function initialize(application) {
  application.inject('route', 'radical', 'service:radical')
  application.inject('controller', 'radical', 'service:radical')
}

export default {
  name: 'radical',
  initialize: initialize,
}
