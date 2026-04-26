---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/package.json
---

{
  "name": "@ramsey-design-system/<%= h.inflection.dasherize( h.changeCase.lower( name ) ) %>",
  "sideEffects": [
    "**/*.css",
    "**/*.scss"
  ],
  "version": "0.0.0",
  "description": "Ramsey Design System <%= h.inflection.titleize( h.changeCase.lower( name ) ) %> component",
  "license": "UNLICENSED",
  "author": "Ramsey Solutions",
  "main": "dist/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.cjs.js",
  "module": "dist/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.esm.js",
  "types": "dist/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.d.ts",
  "files": [
    "dist",
    "sass"
  ],
  "dependencies": {
    "@ramsey-design-system/tokens": "<%= rdsTokensVersion %>",
    "classnames": "2.3.2"
  },
  "peerDependencies": {
    "react": "^17.0.1 || ^18.2.0 || ^19.0.0",
    "react-dom": "^17.0.1 || ^18.2.0 || ^19.0.0"
  },
  "scripts": {
    "build": "npm-run-all --parallel --max-parallel 2 build:*",
    "build:js": "rollup -c",
    "build:css": "yarn sass sass/_index.scss:dist/<%= h.inflection.dasherize( h.changeCase.lower( name ) ) %>.css --load-path=../../node_modules/",
    "watch": "npm-run-all --parallel 'build:* --watch'"
  }
}
