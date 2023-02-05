module.exports = {
  root: true,
  extends: [
    'react-app',
    'standard',
    'eslint:recommended',
    'plugin:mdx/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings'
  ],
  plugins: [
    'babel',
    'import',
    'jsx-a11y',
    'promise',
    'react',
    'standard'
  ],
  settings: {
    'import/extensions': ['.js', '.jsx'],
    'import/resolver': { node: { extensions: ['.js', '.jsx'] } },
    react: { version: 'detect' },
    linkComponents: [
      { name: 'Link', linkAttribute: 'to' }
    ],
    'mdx/code-blocks': true
  },
  rules: {
    semi: [2, 'always'],
    'react/jsx-no-undef': ['error'],
    'no-undef': ['error'],
    'no-var': 'error',
    'no-func-assign': 'error',
    'no-class-assign': 'error',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/no-absolute-path': 'error',
    'import/no-webpack-loader-syntax': 'error',
    'import/no-mutable-exports': 'error',
    'import/no-duplicates': 'error',
    // "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ] } ],
    'react/prefer-stateless-function': 'off',
    'react/no-children-prop': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off'
  },
  globals: {
    __PATH_PREFIX__: true,
    Text: true,
    Title: true
  },
  env: {
    browser: true,
    es6: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  }
};
