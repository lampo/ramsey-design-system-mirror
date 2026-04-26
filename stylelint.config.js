module.exports = {
  extends: ["stylelint-config-sass-guidelines"],
  plugins: ["stylelint-scss", "stylelint-order"],
  ignoreFiles: [
    "**/dist/**",
    "**/build/**",
    "**/node_modules/**",
    "**/target/**",
  ],
  overrides: [
    {
      files: ["**/*.scss"],
      customSyntax: "postcss-scss",
    },
  ],
  rules: {
    "@stylistic/string-quotes": null,
    "@stylistic/function-parentheses-space-inside": null,
    "@stylistic/indentation": null,
    "selector-class-pattern": "^([a-z][a-zA-Z0-9\\-]*|[A-Z][a-zA-Z0-9\\-]*)$",
    "max-nesting-depth": [
      5,
      {
        ignore: ["blockless-at-rules"],
      },
    ],
    "function-url-quotes": "never",
    "at-rule-no-unknown": null,
    "selector-no-qualifying-type": null,
    "scss/at-rule-no-unknown": true,
    "scss/no-global-function-names": null,
    "scss/at-import-partial-extension-disallowed-list": null,
    "scss/dollar-variable-colon-space-after": null,
    "order/order": [
      "dollar-variables",
      "custom-properties",
      "declarations",
      "rules",
    ],
    "order/properties-alphabetical-order": null,
  },
};
