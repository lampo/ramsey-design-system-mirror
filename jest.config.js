const { jsWithBabel: tsjPreset } = require("ts-jest/presets");
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: "jsdom",
  moduleFileExtensions: ["js", "json", "ts", "tsx", "vue"],
  modulePathIgnorePatterns: ["<rootDir>/target"],
  transform: {
    ...tsjPreset.transform,
    "^.+\\.tsx?$": ["ts-jest", { tsconfig: { ignoreDeprecations: "6.0", isolatedModules: true } }],
    "^.+\\.vue$": "@vue/vue3-jest",
  },
};
