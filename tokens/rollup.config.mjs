import typescript from "@rollup/plugin-typescript";

export default [
  {
    input: ["dist/types/spacing-block.ts", "dist/types/color.ts", "dist/types/breakpoint.ts"],
    output: {
      dir: "dist/types",
      entryFileNames: "[name].js",
      format: "es",
    },
    plugins: [typescript({ tsconfig: "./tsconfig.json" })]
  },
]
