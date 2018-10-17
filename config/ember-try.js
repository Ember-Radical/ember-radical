
/* eslint-env node */
module.exports = {
  useYarn: true,
  scenarios: [
    {
      name: 'ember-2.18.X',
      npm: {
        devDependencies: {
          'ember-source': '~2.18.0'
        }
      }
    },
    {
      name: 'ember-3.2.X',
      npm: {
        devDependencies: {
          'ember-source': '~3.2.2'
        }
      }
    },
    {
      name: 'ember-3.4.X',
      npm: {
        devDependencies: {
          'ember-source': '~3.4.0'
        }
      }
    }
  ]
};