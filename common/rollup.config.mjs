import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default [
  {
    input: "ts/index.ts",
    output: [
      {
        file: "dist/js/index.cjs.js",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/js/index.esm.js",
        format: "es",
      },
    ],
    plugins: [
      typescript({ tsconfig: "./tsconfig.json" }),
      resolve(),
      commonjs(),
    ],
    external: ["react"],
  },
  {
    input: "react/index.ts",
    output: [
      {
        file: "dist/react/index.cjs.js",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/react/index.esm.js",
        format: "es",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist/react",
      }),
      resolve(),
      commonjs(),
    ],
    external: ["react", "@ramsey-design-system/common"],
  },
  {
    input: "vue/index.ts",
    output: [
      {
        file: "dist/vue/index.cjs.js",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/vue/index.esm.js",
        format: "es",
      },
    ],
    plugins: [
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist/vue",
      }),
      resolve(),
      commonjs(),
    ],
    external: [],
  },
];
