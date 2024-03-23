module.exports = {
  extends: ['@one-folder-app/eslint-config-custom/react'],
  parserOptions: {
    project: './tsconfig.json',
    root: true,
    tsconfigRootDir: __dirname
  },
  ignorePatterns: ['dist', '.eslintrc.cjs']
};
