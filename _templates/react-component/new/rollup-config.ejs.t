---
to: components/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>/rollup.config.mjs
---

import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default [
  {
    input: '<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.tsx',
    output: [
      {
        file: 'dist/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.cjs.js',
        format: 'cjs',
        exports: 'named',
        sourcemap: true
      },
      {
        file: 'dist/<%= h.inflection.camelize( h.changeCase.lower( name ) ) %>.esm.js',
        format: 'es',
        sourcemap: true
      }
    ],
    plugins: [
      typescript({ tsconfig: './tsconfig.json' }),
      resolve(),
      commonjs()
    ],
    external: ['react', 'classnames']
  }
];
