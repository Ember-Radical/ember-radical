'use strict';
const packageJSON = require('./package.json');

/**
 * Ember Radical addon that extends Ember CLI root Addon class. Read in
 * consuming application's options and feature flags to configure Radical
 * features.
 * See https://ember-cli.com/api/classes/Addon.html for rather unhelpful docs.
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
   * @property radicalOptions
   * @type {Object}
   */
  radicalOptions: {
    consoleImage: true,
    stripCode: true
  },
  /**
   * Default feature flags for features used in Radical code should be specified
   * here. These are merged with the consuming app's feature flags in the
   * `included` hook
   * @property radicalDefaultFeatureFlags
   * @type {Object}
   */
  radicalDefaultFeatureFlags: {
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

    // Find the parent app by crawling addon tree
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    // Validate consuming app options objects exist
    app.options = app.options || {};
    app.options.emberRadical = app.options.emberRadical || {};
    app.options.minifyJS = app.options.minifyJS || {};


    // ========================================================
    // Assemble Addon Configurations
    // ========================================================

    // Collect addon variables and references
    const env = process.env.EMBER_ENV || 'development';
    const vendorPath = this.treePaths.vendor;
    // This is the config specified in consuming application's config/environment.js
    const applicationConfig = this.project.config(env);
    // Create Radical options using specified and default options
    const radicalOptions = Object.assign(
      this.radicalOptions,
      app.options.emberRadical
    );
    // Grab the app version from package.json for use in the env
    const radicalVersion = packageJSON.version;
    // Create feature flags using env, specified flags && default Radical feature flags
    const featureFlags = Object.assign(
      {
        DEVELOPMENT: env === 'development',
        PRODUCTION: env === 'production',
        TEST: env === 'test',
        RAD_VERSION: radicalVersion || '0.0.0'
      },
      // Radical features defaults, will be overriden by any consumer specified flags
      this.radicalDefaultFeatureFlags,
      // Matches https://github.com/kategengler/ember-feature-flags name convention
      applicationConfig.featureFlags || {}
    );
    const minifyJSOptions = {
      options: {
        enabled: true, // If you want to remove unreachable code, uglify must be enabled
        compress: {
          global_defs: featureFlags,
          dead_code: true
        }
      }
    };

    // Assign feature flags for use in `contentFor` hook
    this.featureFlags = featureFlags;
    this.radicalOptions = radicalOptions;
    this.env = env;


    // ========================================================
    // Handle Updating Consuming Application
    // ========================================================

    // Import console image library into application unless disabled
    if (radicalOptions.consoleImage) {
      app.import(`${vendorPath}/console-image.js`); // Radical dev logging messages
    }

    // If consumer wants to strip unreachable code, merge UglifyJS options into
    // consuming app configuration. NOTE that even if this is enabled we ONLY
    // want to do it for production builds b/c it will crush the dev rebuild time
    if (radicalOptions.stripCode && env === 'production') {
      app.options.minifyJS = Object.assign(app.options.minifyJS, minifyJSOptions);
    }
  },
  /**
   * Handle setting no-ops/globals for Radical features that require them.
   * The returned string below is added to the consuming application in the
   * `{{content-for "head"}}` outlet.
   * See https://github.com/emberyvr/content-for/blob/master/README.md for
   * examples
   * @method contentFor
   * @param {string} type The type of content for outlet, allows you to target specific outlets
   * @return {string} Content that is injected into the content-for outlet. We
   *                  return a `<script>` that handles creating globals/no-ops for
   *                  Radical features that require them.
   */
  contentFor(type) {
    if (type !== 'head') { return; }
    let featureFlags, consoleImage;

    // If this is not a production build, we ALWAYS need a global reference for
    // feature flags, even if it's prod we need them if stripCode is disabled
    featureFlags = this.radicalOptions.stripCode === false || this.env !== 'production' ?
      `/* These flags are auto-generated in Ember Radical's contentFor hook */
      var featureFlags = ${JSON.stringify(this.featureFlags)};

      for (var feature in featureFlags) {
        if (featureFlags.hasOwnProperty(feature)) {
          window[feature] = featureFlags[feature];
        }
      };`
      : '';

    // Add a no-op for the console image library if the consumer doesn't want it
    // to prevent our code from throwing an error trying to use it.
    consoleImage = this.radicalOptions.consoleImage ?
      ''
      : '\nconsole.image = function() {};';

    return `<script>${featureFlags}${consoleImage}</script>`;
  }
};
