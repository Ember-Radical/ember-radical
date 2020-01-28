/* eslint-env node */
module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: 'ember-3.4.X',
      npm: {
        devDependencies: {
          'ember-source': '~3.4.0',
        },
      },
    },
    {
      name: 'ember-3.10.X',
      npm: {
        devDependencies: {
          'ember-source': '~3.10.0',
        },
      },
    },
  ],
}
