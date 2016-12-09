import Ember from 'ember';

export default Ember.Controller.extend({

  exampleGroupExpanded: false,

  actions: {
    expandCollapseAll() {
      this.toggleProperty('exampleGroupExpanded');
    }
  }
});
