const EmberAddon = require('ember-cli/lib/broccoli/ember-addon')
const packageJSON = require('./package.json')

const env = EmberAddon.env()
module.exports = function(defaults) {
  const options = {
    sassOptions: {
      extension: 'scss',
      includePaths: ['node_modules/bootstrap/scss'],
    },
    // Don't fingerprint the ember-logo b/c it is pulled using a path from the
    // docs meta which doesn't get updated with fingerprint hash
    fingerprint: {
      exclude: ['ember-logo'],
    },

    // Inline replace the version in the dummy app using babel
    babel: {
      plugins: [
        [
          'inline-replace-variables',
          { RAD_VERSION: packageJSON.version || '0.0.0' },
        ],
      ],
    },
  }
  // We don't need to include polyfill except for the tests. Make sure this is here
  // in both dev and test
  if (env === 'development' || env === 'test') {
    options['ember-cli-babel'] = {
      includePolyfill: true, // All them sweet polyfills
    }
  }
  const app = new EmberAddon(defaults, options)

  // We use the test app as our demo app with production and for development
  // with dev builds. In test, don't import external demo deps. (Trying to
  // import template compiler in older Ember version test suites will blow
  // up the tests)
  if (app.env !== 'test') {
    // Import template compiler for documentation
    app.import('vendor/ember/ember-template-compiler.js')
  }

  return app.toTree()
}
