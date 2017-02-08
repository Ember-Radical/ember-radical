import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  init() {
    this._super(...arguments);

    this.set('version', RAD_VERSION);
  }
});
