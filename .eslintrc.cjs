/* eslint-env node */
module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@next/next/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  root: true,
  env: {
    browser: true, // Add any other environments you need, such as Node.js or CommonJS
    node: true,
  },
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
  },
};
