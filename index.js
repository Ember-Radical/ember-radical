'use strict';

const fs = require('fs');
const path = require('path');

module.exports = {
  name: 'ember-radical',

  // Properties
  // ---------------------------------------------------------------------------
  /**
   * Easy reference for all possible configs that can be passed to addon.
   * @property defaultConfig
   * @type {Object}
   */
  defaultConfig: {
    stripCode: true
  },

  // Methods
  // ---------------------------------------------------------------------------

  /**
   * Create file with consuming applications feature flags in `/vendor` and call
   * `app.import` on that file. This creates the necessary globals for feature
   * flags in dev and test envs, or always if `stripCode` has been turned off.
   */
  _importFeatureFlags(flags) {
    try {
      const file = `
        var featureFlags = ${JSON.stringify(flags)};
        if(window) {
          for (var feature in featureFlags) {
            if (featureFlags.hasOwnProperty(feature)) {
              window[feature] = featureFlags[feature];
            }
          }
        }`;
      fs.writeFileSync(path.resolve('vendor', 'feature-flags.js'), file, {encoding: 'utf8'});
    } catch(ex) {
      console.warn('error saving feature flags: ', ex);
    }

    this.app.import(`${this.vendorPath}/feature-flags.js`);
  },

  // Addon Hooks
  // ---------------------------------------------------------------------------

  included: function(app) {
    this._super.included.apply(this, arguments);

    // Find the parent app by crawling addon tree
    while (typeof app.import !== 'function' && app.app) {
      app = app.app;
    }

    app.options = app.options || {};

    // Setup addon variables
    const appConfig = this.project.config(app.env);
    let addonConfig = app.options.emberRadical ? app.options.emberRadical : {};
    const envFlags = {
      DEVELOPMENT: appConfig.environment === 'development',
      PRODUCTION: appConfig.environment === 'production',
      TEST: appConfig.environment === 'test',
      TAGGING: false
    };
    const featureFlags = Object.assign(envFlags, appConfig.featureFlags || {});
    const vendorPath = this.treePaths.vendor;

    // ========================================================
    // Create/assign configs
    // ========================================================

    // Merge in defaults for addon
    addonConfig = Object.assign(this.defaultConfig, addonConfig);

    // Set consuming app config and Ember Radical config
    this.app = app;
    this.appConfig = appConfig;
    this.addonConfig = addonConfig;
    this.vendorPath = vendorPath;

    // ========================================================
    // Setup uglify js configs
    // ========================================================

    let minifyJSOptions = {
      options: {
        compress: {
          global_defs: featureFlags,
          dead_code: true
        }
      }
    };

    // Merge UglifyJS options into parent app configuration
    if (addonConfig.stripCode && appConfig.environment === 'production') {
      app.options.minifyJS = Object.assign(app.options.minifyJS, minifyJSOptions);

      // If you want to remove unreachable code, uglify must be enabled
      if (!app.options.minifyJS.enabled) { app.options.minifyJS.enabled = true; }
    }

    // Set feature flag globals in dev and test envs or always if strip code is turned of
    if (!addonConfig.stripCode || appConfig.environment === 'development' || appConfig.environment === 'test') {
      this._importFeatureFlags(featureFlags);
    }
  }
};
