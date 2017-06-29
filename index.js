'use strict';

/**
 * Read in consuming application's options and feature flags to configure Radical
 * features.
 * @class Index
 * @constructor
 * @extends EmberCLI.Addon
 */
module.exports = {
  name: 'ember-radical',

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Default feature flags for features used in Radical code should be specified
   * here. These are merged with the consuming app's feature flags in the
   * `included` hook
   * @property featureFlags
   * @type {Object}
   */
  featureFlags: {
    TAGGING: false
  },

  // Addon Hooks
  // ---------------------------------------------------------------------------
  /**
   * Recommended hook for including vendor files and setting configuration
   * options. Handle merging consumer configs with default addon configs. Import
   * console image library in dev.
   * @method included
   * @param {Object} app Addon consumer (can be an app or addon)
   */
  included(app) {
    this._super.included.apply(this, arguments);
    this.env = process.env.EMBER_ENV || 'development';

    // Ensure `app` is consuming application by crawling addon tree
    while (typeof app.import !== 'function' && app.app) { app = app.app; }

    // Merge the default addon feature flags with those configured by consuming app
    this.featureFlags = Object.assign(
      this.featureFlags,
      this.project.config(this.env).featureFlags
    );

    this.options = this.options || {};
    this.options.babel = this.options.babel || {};
    this.options.babel.plugins = this.options.babel.plugins || [];
    this.options.babel.plugins.push(
      ['inline-replace-variables', Object.assign({ NODE_ENV: this.env }, this.featureFlags)]
    );

    // Import a truly Radical dev logging library (dev only)
    app.import(`${this.treePaths.vendor}/console-image${this.env === 'production' ? '-shim' : ''}.js`);
  }
};
