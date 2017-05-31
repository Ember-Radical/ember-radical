'use strict';
const packageJSON = require('./package.json');

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
   * Options for configuring addon. All default options should be specified here.
   * These defaults are assigned to the consuming app's specified options in the
   * `included` hook.
   * @property addonOptions
   * @type {Object}
   */
  addonOptions: {
    consoleImage: true,
    stripCode: true
  },
  /**
   * Default feature flags for features used in Radical code should be specified
   * here. These are merged with the consuming app's feature flags in the
   * `included` hook
   * @property featureFlags
   * @type {Object}
   */
  featureFlags: {
    RAD_VERSION: packageJSON.version || '0.0.0',
    TAGGING: false
  },

  // Addon Hooks
  // ---------------------------------------------------------------------------
  /**
   * Recommended hook for including vendor files and setting configuration
   * options. Ember Radical imports a console library in dev environments for
   * radical logging messages and injects feature flags into consuming apps when
   * stripCode is disabled.
   * @method included
   * @param {Object} app Addon consumer, (can be an app or addon)
   */
  included: function(app) {
    this._super.included.apply(this, arguments);
    this.env = process.env.EMBER_ENV || 'development';

    // Ensure `app` is consuming application by crawling addon tree
    while (typeof app.import !== 'function' && app.app) { app = app.app; }

    // Merge default addon options with any configured options
    app.options = app.options || {};
    app.options.emberRadical = app.options.emberRadical || {};
    this.addonOptions = Object.assign(this.addonOptions, app.options.emberRadical);

    // Merge the default addon feature flags with those configured by consuming app
    this.featureFlags = Object.assign(
      this.featureFlags,
      this.project.config(this.env).featureFlags,
      { NODE_ENV: this.env }
    );

    // Import console image library into application unless disabled
    if (this.addonOptions.consoleImage) {
      app.import(`${this.treePaths.vendor}/console-image.js`); // Radical dev logging messages
    }

    // In prod builds configre UglifyJS to strip unreachable code with build variables
    if (this.addonOptions.stripCode && this.env === 'production') {
      app.options.minifyJS = app.options.minifyJS || {};
      app.options.minifyJS.options = app.options.minifyJS.options || {};
      let minifyOpts = app.options.minifyJS.options;

      minifyOpts.enabled = true; // If you want to remove unreachable code, uglify must be enabled
      minifyOpts.compress = minifyOpts.compress || {};
      minifyOpts.compress.dead_code = true; // Prunes dead code
      minifyOpts.compress.global_defs = minifyOpts.compress.global_defs || {};

      for (let flag in this.featureFlags) {
        minifyOpts.compress.global_defs[flag] = this.featureFlags[flag];
      }
    }
  },
  /**
   * Handle setting no-ops/globals for Radical features that require them. The
   * returned string below is added to the consuming application in the
   * `{{content-for "head"}}` outlet. See
   * https://github.com/emberyvr/content-for/blob/master/README.md for examples
   * @method contentFor
   * @param {string} type The type of content for outlet, allows you to target
   * specific outlets
   * @return {string} Content that is injected into the content-for outlet. We
   *                  return a `<script>` that handles creating globals/no-ops for
   *                  Radical features that require them.
   */
  contentFor(type) {
    if (
      (this.env !== 'production' || this.addonOptions.stripCode === false)
      && type === 'head'
    ) {
      return `
      <script>/* These flags are auto-generated in Ember Radical's contentFor hook */
      var featureFlags = ${JSON.stringify(this.featureFlags)};

      for (var feature in featureFlags) {
        if (featureFlags.hasOwnProperty(feature)) {
          window[feature] = featureFlags[feature];
        }
      };
      ${this.addonOptions.consoleImage ? '' : 'console.image = function() {};'}
      </script>`;
    }
  }
};
