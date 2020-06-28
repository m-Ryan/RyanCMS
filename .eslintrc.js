module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "object-curly-spacing": [2, "always"],
    quotes: ["error", "single"],
    "no-unused-vars": 0,
    camelcase: 0,
    "guard-for-in": 0,
    "linebreak-style": "off",
    indent: 0,
    "operator-linebreak": 0,
    "no-console": 0,
    "class-methods-use-this": 0,
    "prefer-destructuring": 0,
    "dot-notation": 0,
  },
};
// 0 = off, 1 = warn, 2 = error
