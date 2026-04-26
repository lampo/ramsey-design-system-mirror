// eslint.config.js
import storybook from "eslint-plugin-storybook";
import react from "eslint-plugin-react";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import { FlatCompat } from "@eslint/eslintrc";
import globals from "globals";

const compat = new FlatCompat();

export default [
  ...compat.extends("prettier"),
  {
    ignores: ["**/dist/**", "**/snapshot/**", "storybook-static/**", "stylelint.config.js", "tailwind-preset.stub.js", "target/", "**/*.d.ts"],
  },
  {
    files: ["**/*.js", "**/*.jsx"],
    plugins: {
      storybook,
      react,
    },
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node,
        ...globals.browser,
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      ...storybook.configs.recommended.rules,
      // Match original @ramseyinhouse config but adapted to existing codebase style
      "complexity": ["error", 15], // Error at 15 to accommodate existing code
      "no-console": "warn", // Original was warning, not off
      "no-warning-comments": ["warn", { "terms": ["todo", "fixme", "xxx"], "location": "start" }],
      // Legacy overrides
      "valid-jsdoc": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-undefined": "off",
      "no-process-env": "off"
    },
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": tseslint,
      react
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      // Match original @ramseyinhouse config adapted for TypeScript and existing codebase style
      "complexity": ["error", 15],
      "no-console": "warn",
      "no-warning-comments": ["warn", { "terms": ["todo", "fixme", "xxx"], "location": "start" }],
      // TypeScript specific
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", { 
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_|^React$|^ReactElement$"
      }],
      // React rules for TSX
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error"
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },
];
