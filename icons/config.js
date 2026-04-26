import { glob } from "glob";
import _ from "lodash";

const iconsPath = "src/svg/**/*";
const files = glob
  .sync(iconsPath)
  .map((filePath) => filePath.replace("src/svg/", "").replace(".svg", ""));

const config = {
  source: ["properties/**/*.json"],
  platforms: {
    "assets/icons/sprite": {
      transforms: [
        "attribute/cti",
        "asset/path",
        "asset/svg",
        "asset/svg/props",
      ],
      files: [
        {
          destination: "dist/ramsey-icons.svg",
          format: "svg/symbols",
        },
      ],
    },
    scss: {
      transforms: ["name/ti/kebab", "asset/path", "asset/svg/dataUri"],
      prefix: "rds",
      files: [
        {
          destination: "dist/scss/_variables.scss",
          format: "scss/variables",
          options: {
            outputReferences: false,
          },
        },
      ],
    },
    "react/svg": {
      transformGroup: "react/svg",
      files: [
        {
          destination: `lib/react-components/index.tsx`,
          format: "react/svg-index",
        },
        ...files.map((filePath) => {
          const iconName = `${_.upperFirst(_.camelCase(filePath))}Icon`;
          return {
            destination: `lib/react-components/${iconName}.tsx`,
            format: "react/svg-component",
            options: { iconName },
          };
        }),
      ],
    },
    "magnolia-yaml": {
      files: [
        {
          destination: "dist/magnolia/icons.yaml",
          format: "magnolia-yaml/icons",
        },
      ],
    },
    vue: {
      transformGroup: "vue/svg",
      files: files.map((filePath) => {
        const iconName = `${_.upperFirst(_.camelCase(filePath))}Icon`;
        return {
          destination: `lib/vue-components/${iconName}.vue`,
          format: "vue/svg",
          options: { iconName },
        };
      }),
    },
  },
};

export default config;
