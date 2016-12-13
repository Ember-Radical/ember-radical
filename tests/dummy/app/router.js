import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('drawers');
  this.route('tabs');
  this.route('cards');
  this.route('modals');
});

export default Router;
