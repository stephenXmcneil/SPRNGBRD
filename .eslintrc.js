module.exports = {
  plugins: ['jest'],
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard',
    'plugin:jest/all'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
  },
  globals: {
    axios: true
  }
}
