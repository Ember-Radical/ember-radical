import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    customAction(derp) {
      console.info('Greetings, Program!', derp);
    }
  }
});
