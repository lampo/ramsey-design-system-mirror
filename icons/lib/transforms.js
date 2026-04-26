import kebabCase from "lodash.kebabcase";
import upperFirst from "lodash.upperfirst";
import camelCase from "lodash.camelcase";
import { load } from "cheerio";
import svgToMiniDataURI from "mini-svg-data-uri";
import { readFile } from "fs/promises";

export const AssetSvgTransform = {
  name: "asset/svg",
  type: "value",
  matcher(prop) {
    return prop.value.endsWith(".svg");
  },
  transform: async (prop) => {
    const svgString = (await readFile(prop.value, "utf8")).toString();
    const $ = load(svgString, { normalizeWhitespace: true, xmlMode: true });
    return {
      svg: svgString,
      viewBox: $("svg").attr("viewBox"),
      width: $("svg").attr("width"),
      height: $("svg").attr("height"),
      children: $("svg").html(),
    };
  },
};

export const AssetSvgDataUriTransform = {
  name: "asset/svg/dataUri",
  type: "value",
  transform: async (prop) => {
    const svg = (await readFile(prop.value, "utf8")).toString();
    return `url("${svgToMiniDataURI(svg)}")`;
  },
};

export const AssetSvgPropsTransform = {
  name: "asset/svg/props",
  type: "attribute",
  transform(prop) {
    const originalAttrs = prop.attributes || {};
    const svgData = prop.value || {};
    const generatedAttrs = {
      viewBox: svgData.viewBox,
      width: svgData.width,
      height: svgData.height,
      children: svgData.children,
    };
    return Object.assign(generatedAttrs, originalAttrs);
  },
};

export const AssetSvgPropsReactTransform = {
  name: "asset/svg/props/react",
  type: "attribute",
  transform({ attributes = {} }) {
    const { children } = attributes;

    if (!children || typeof children !== "string") return attributes;

    return Object.assign(attributes, {
      children: children.replace(/fill-rule/g, "fillRule"),
    });
  },
};

export const NameTIKebabTransform = {
  name: "name/ti/kebab",
  type: "name",
  transform(prop) {
    const path = [...prop.path];
    path.shift();
    return `rds-${kebabCase(path.join(" "))}`;
  },
};

export const NameITPascalTransform = {
  name: "name/it/pascal",
  type: "name",
  transform(prop) {
    const path = [...prop.path].reverse();
    path.pop();
    return path.map((part) => upperFirst(camelCase(part))).join("");
  },
};

export const ReactSVGTransformGroup = {
  name: "react/svg",
  transforms: [
    "name/it/pascal",
    "asset/path",
    "asset/svg",
    "asset/svg/props",
    "asset/svg/props/react",
  ],
};

export const VueSVGTransformGroup = {
  name: "vue/svg",
  transforms: ["name/it/pascal", "asset/path", "asset/svg", "asset/svg/props"],
};
