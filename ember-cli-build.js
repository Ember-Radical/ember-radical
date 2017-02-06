/*jshint node:true*/
/* global require, module */
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

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  // Import Prism stuff
  app.import('bower_components/prismjs/prism.js');
  app.import('bower_components/prismjs/components/prism-handlebars.js');
  app.import('bower_components/prismjs/components/prism-javascript.js');

  return app.toTree();
};
