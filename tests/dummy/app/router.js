import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
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
