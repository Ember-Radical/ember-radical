module.exports = {
  root: true,
  parser: 'babel-eslint',
  extends: ['healthsparq', 'prettier'],
  globals: {
    NODE_ENV: true,
    TAGGING: true,
    RAD_VERSION: true,
  },
}
