import Route from 'ember-route';
import inject from 'ember-service/inject';
import config from '../config/environment';

/**
 * Demo site root application route
 * @class Application
 * @constructor
 * @uses Fountainhead
 * @extends Ember.Route
 */
export default Route.extend({
  fountainhead: inject(),

  /**
   * Handle setting the apiBase for Fountainhead API calls to match the
   * app's `config.rootURL`. This is required b/c the production demo app served
   * by github is under the namespace `ember-fountainhead`.
   *
   * In dev the `rootURL` is `/`, so the default `/docs` namespace is preserved
   * @method init
   */
  init() {
    this.set('fountainhead.apiNamespace', `${config.rootURL}docs`);
  }
});
