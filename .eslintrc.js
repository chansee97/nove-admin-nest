process.env.ESLINT_TSCONFIG = 'tsconfig.json'
module.exports = {
  extends: '@chansee97/eslint-config-ts',
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-unsafe-assignment': 'off',
  },
}
