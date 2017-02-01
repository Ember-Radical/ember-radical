import Ember from 'ember';

export default Ember.Controller.extend({

  tabs: Ember.A([
    {
      label: 'bar',
      elementId: 'bar',
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
        label: 'foo',
        elementId: 'foo',
        content: 'The foo tab added after'
      });
    }
  }
});
