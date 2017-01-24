'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  /*
   * At one point we added feature flags to the vendor dir and left them there,
   * so we manually updated the gitignore for consumers. Instead we know delete
   * those feature flags after importing them. If we get down the road and this
   * method is working great, delete the gitignore changes below.
   */
  afterInstall() {
    // Read current gitignore
    // let gitignore = fs.readFileSync(path.resolve('.gitignore'), { encoding: 'utf8' });

    // If feature-flags has already been added, do less
    // if (gitignore.indexOf('vendor/feature-flags.js') !== -1) { return; }

    // Write new entry to gitignore
    // fs.writeFileSync(
    //   path.resolve('.gitignore'),
    //   `${gitignore}${EOL}# Auto generated ember-radical feature flags${EOL}vendor/feature-flags.js`,
    //   { encoding: 'utf8' }
    // );

    console.log('Thanks for installing Ember Radical, we hope you build something radical!');
  }
};
