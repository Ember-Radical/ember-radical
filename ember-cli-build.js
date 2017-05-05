var EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  var app = new EmberAddon(defaults, {
    sassOptions: {
      extension: 'scss'
    },
    // Don't fingerprint the ember-logo b/c it is pulled using a path from the
    // docs meta which doesn't get updated with fingerprint hash
    fingerprint: {
      exclude: ['ember-logo']
    }
  });

  // We use the test app as our demo app with production and for development
  // with dev builds. In test, don't import external demo deps. (Trying to
  // import template compiler in older Ember version test suites will blow
  // up the tests)
  if (app.env !== 'test') {
    // Import template compiler for documentation
    app.import('vendor/ember/ember-template-compiler.js');

    // Import Prism deps
    app.import('bower_components/prismjs/prism.js');
    app.import('bower_components/prismjs/components/prism-handlebars.js');
    app.import('bower_components/prismjs/components/prism-javascript.js');
  }

  return app.toTree();
};
