module.exports = {
  name: 'Ember Radical Docs',
  description: 'API documentation for Ember Radical Components, Helpers and Services',
  includeForProduction: false,
  entry: ['addon'],
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
