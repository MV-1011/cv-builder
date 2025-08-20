module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/no-unused-vars': 'warn'
  }
};