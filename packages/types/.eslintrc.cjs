module.exports = {
  extends: ['@one-folder-app/eslint-config-custom/node'],
  parserOptions: {
    project: './tsconfig.json',
    root: true,
    tsconfigRootDir: __dirname
  }
};
