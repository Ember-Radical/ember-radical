const common = {
  liveEdit: true, // Generate fountainhead docs before a build is run for live reloading
  includeVendorStyles: false, // We directly import styles for dev hot reloading
  quiet: false, // Supresses error logging
  name: 'Ember Radical Docs',
  description: 'API documentation for Ember Radical Components, Helpers and Services',
  entry: ['addon', 'app'],
  output: {
    filename: 'fountainhead-data.json',
    path: 'tests/dummy/public/docs'
  },
  external: {
    data: [
      {
        base: 'http://emberjs.com/api/',
        json: 'http://builds.emberjs.com/release/ember-docs.json'
      }
    ]
  }
};

// Production only configs
const production = {
  // The demo app is a gh-pages app that is served from `/ember-radical/`
  logo: '/ember-radical/ember-fountainhead/img/ember-logo.png'
};

if (process.env.NODE_ENV === 'production') {
  Object.assign(common, production);
}

module.exports = common;
