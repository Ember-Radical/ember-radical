import Ember from 'ember';
import config from './config/environment';
const { getOwner, get, inject } = Ember;

const Router = Ember.Router.extend({

  radical: inject.service(),

  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    this._super(...arguments);

    console.log('currentRouteName', this.get('currentRouteName'));
    const currentRoute = getOwner(this).lookup(`route:${this.get('currentRouteName')}`);

    console.log('currentRoute', currentRoute);

    this.set('radical.currentRouteTitle', (get(currentRoute, 'pageTitle') || 'Ember Radical'));
  }
});

Router.map(function() {
  this.route('getting-started', function() {
    this.route('cards');
    this.route('drawers');
    this.route('dropdowns');
    this.route('modals');
    this.route('popovers');
    this.route('tabs');
  });
});

export default Router;
