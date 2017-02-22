import Ember from 'ember';

export default Ember.Controller.extend({
  actions: {
    customAction(derp) {
      console.info('Greetings, Program!', derp);
    }
  }
});
