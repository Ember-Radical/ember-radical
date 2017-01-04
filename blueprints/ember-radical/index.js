'use strict';
const fs = require('fs');
const path = require('path');
const EOL = require('os').EOL;

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  // Add an ignore for generated vendor feature flags
  afterInstall() {
    // Read current gitignore
    let gitignore = fs.readFileSync(path.resolve('.gitignore'), { encoding: 'utf8' });

    // If feature-flags has already been added, do less
    if (gitignore.indexOf('vendor/feature-flags.js') !== -1) { return; }

    // Write new entry to gitignore
    fs.writeFileSync(
      path.resolve('.gitignore'),
      `${gitignore}${EOL}# Auto generated ember-radical feature flags${EOL}vendor/feature-flags.js`,
      { encoding: 'utf8' }
    );
  }
};
