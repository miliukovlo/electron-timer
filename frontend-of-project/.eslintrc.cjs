module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    '@electron-toolkit/eslint-config-ts/recommended',
    //Отключить prettier у electron
    // '@electron-toolkit/eslint-config-prettier'
  ]
}
