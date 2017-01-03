import Ember from 'ember';
import config from './config/environment';
import fountainheadRoutes from 'ember-fountainhead/utils/route-setup';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('drawers');
  this.route('tabs');
  this.route('cards');
  this.route('modals');
  this.route('dropdowns');

  fountainheadRoutes(this);
});

export default Router;
