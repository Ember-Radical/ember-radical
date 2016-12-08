import Ember from 'ember';

export default Ember.Controller.extend({

  tabs: Ember.A([
    {
      name: 'bar',
      elmentId: 'bar',
      content: 'The bar tab'
    }
  ]),

  tabHidden: true,

  actions: {
    toggleTabVisible() {
      this.toggleProperty('tabHidden');
    },

    addTab() {
      this.get('tabs').pushObject({
        name: 'foo',
        elementId: 'foo',
        content: 'The foo tab added after'
      });
    }
  }
});
