module.exports = {
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint'],
    root: true,
    env: {
        "es6": true,
        "browser": true,
        "node": true
    },
    rules: {
        "no-console": 1,
    }
}
