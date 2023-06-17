module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  daisyui: {
    theme: {
      extend: {
        colors: {
          light: {
            primary: '#FF0000', // Light mode primary color
            secondary: '#00FF00', // Light mode secondary color
          },
          dark: {
            primary: '#0000FF', // Dark mode primary color
            secondary: '#FFFF00', // Dark mode secondary color
          },
        },
      },
    },
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': 'warn',
  },
}
