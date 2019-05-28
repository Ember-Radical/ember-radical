import { A } from '@ember/array'
import Controller from '@ember/controller'

export default Controller.extend({
  disableAddTabButton: false,

  tabs: A([
    {
      label: 'bar',
      elementId: 'bar',
      content: 'The bar tab',
    },
  ]),

  tabHidden: true,

  actions: {
    toggleTabVisible() {
      this.toggleProperty('tabHidden')
    },

    addTab() {
      this.get('tabs').pushObject({
        label: 'foo',
        elementId: 'foo',
        content: 'The foo tab added after',
      })
      this.set('disableAddTabButton', true)
    },
  },
})
