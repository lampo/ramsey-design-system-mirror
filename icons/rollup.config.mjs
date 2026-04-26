import typescript from "@rollup/plugin-typescript";
import vue from "rollup-plugin-vue";
import { globSync } from "glob";
import replace from "@rollup/plugin-replace";
/**
 * React
 */
const filePath = "lib/react-components/**/*";
const baseReactConfig = {
  input: filePath,
  plugins: [typescript({ tsconfig: "./tsconfig.json" })],
  external: ["react"],
};

const esmIndex = {
  ...baseReactConfig,
  external: [...baseReactConfig.external, /Icon/],
  input: "lib/react-components/index.tsx",
  output: [
    {
      file: "dist/index.esm.js",
      format: "es",
      exports: "named",
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      delimiters: ["", ""],
      include: ["lib/react-components/index.tsx"],
      values: {
        ".js": ".esm.js",
      },
    }),
    ...baseReactConfig.plugins,
  ],
};

const cjsIndex = {
  ...baseReactConfig,
  external: [...baseReactConfig.external, /Icon/],
  input: "lib/react-components/index.tsx",
  output: [
    {
      file: "dist/index.cjs.js",
      format: "cjs",
      exports: "named",
    },
  ],
  plugins: [
    replace({
      preventAssignment: true,
      delimiters: ["", ""],
      include: ["lib/react-components/index.tsx"],
      values: {
        ".js": ".cjs.js",
      },
    }),
    ...baseReactConfig.plugins,
  ],
};

const files = globSync(filePath);
const components = files.map((file) => ({
  ...baseReactConfig,
  input: file,
  output: [
    {
      file: `dist/${file
        .replace("lib/react-components/", "")
        .replace(".tsx", ".cjs.js")}`,
      format: "cjs",
    },
    {
      file: `dist/${file
        .replace("lib/react-components/", "")
        .replace(".tsx", ".esm.js")}`,
      format: "es",
    },
  ],
}));

/**
 * Vue
 */
const vueFilePath = "lib/vue-components/**/*";
const vueComponents = globSync(vueFilePath).map((file) => ({
  input: file,
  output: [
    {
      file: `dist/vue/${file
        .replace("lib/vue-components/", "")
        .replace(".vue", ".js")}`,
      format: "es",
      exports: "default",
    },
  ],
  external: ["vue"],
  plugins: [vue()],
}));

export default [...components, ...vueComponents, esmIndex, cjsIndex];
