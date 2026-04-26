import _ from "lodash";
import chroma from "chroma-js";
import {
  isBreakpoint,
  isMagnoliaColor,
  isFontSize,
  isColor,
  isFontFamily,
  isBlockSpacing,
  isSize,
} from "./matchers.mjs";

export const SizePxTransform = {
  name: "size/px",
  type: "value",
  filter: (prop) => {
    return (
      prop.attributes.category === "size" &&
      prop.attributes.type !== "lineHeight" &&
      prop.attributes.type !== "breakpoint"
    );
  },
  transform: (prop) => {
    const sizes = Array.isArray(prop.original.value)
      ? prop.original.value
      : [prop.original.value];

    return sizes.map((value) => `${parseInt(value, 10)}px`).join(" ");
  },
};

export const SizePxToEmTransform = {
  name: "size/pxToEm",
  type: "value",
  filter: (prop) => isBreakpoint(prop),
  transform: (prop) => {
    return `${parseInt(prop.original.value, 10) / 16}em`;
  },
};

export const MagnoliaYamlColorsTransform = {
  name: "name/i/kebab",
  type: "name",
  filter: (prop) => isMagnoliaColor(prop),
  transform: (prop) => {
    const { attributes } = prop;
    return _.kebabCase(`${attributes.item || ""}${attributes.subitem || ""}`);
  },
};

export const NameItemCamelTransform = {
  name: "name/i/camel",
  type: "name",
  filter: (prop) => isColor(prop),
  transform: (prop) => {
    const { attributes } = prop;
    return _.camelCase(`${attributes.item || ""}${attributes.subitem || ""}`);
  },
};

export const TailwindFontSizeTransform = {
  name: "size/fontWithLineHeight",
  type: "value",
  filter: (prop) => isFontSize(prop),
  transform: (prop) => {
    const { value, lineHeight } = prop;
    return [value, { lineHeight }];
  },
};

export const TailwindFontFamilyTransform = {
  name: "font/fontStackAsArray",
  type: "value",
  filter: (prop) => isFontFamily(prop),
  transform: (prop) => {
    return prop.value.split(",");
  },
};

function customKebabCase(str) {
  const preserve = str.match(/^\d+[a-zA-Z]+$/) ? [str] : [];
  if (preserve.includes(str)) return str;
  return _.kebabCase(str);
}

export const TailwindCssColorsTransform = {
  name: "name/ci/kebab",
  type: "name",
  filter: (prop) => isColor(prop),
  transform: (prop) => {
    const { attributes } = prop;
    const parts = [];
    if (attributes.category) parts.push(attributes.category);
    if (attributes.type && attributes.type !== "base") parts.push(attributes.type);
    if (attributes.item && attributes.item !== "base") parts.push(attributes.item);
    if (attributes.subitem) parts.push(attributes.subitem);
    return parts.map(customKebabCase).join('-');
  },
};

export const TailwindCssFontSizeTransform = {
  name: "size/cssFontWithLineHeight",
  type: "value",
  filter: (prop) => isFontSize(prop),
  transform: (prop) => {
    return {
      value: prop.value,
      lineHeight: prop.lineHeight,
      name: prop.name
    };
  },
};

export const TailwindCssFontFamilyTransform = {
  name: "font/fontCssName",
  type: "name",
  filter: (prop) => isFontFamily(prop),
  transform: (prop) => {
    const { attributes } = prop;
    const parts = [];
    if (attributes.category) parts.push(attributes.category);
    if (attributes.item) parts.push(attributes.item);
    if (attributes.subitem) parts.push(attributes.subitem);
    return parts.map(customKebabCase).join('-');
  },
};

export const TailwindCssSizeTransform = {
  name: "size/noCategory",
  type: "name",
  filter: (prop) => isSize(prop),
  transform: (prop) => {
    const { attributes } = prop;
    const parts = [];
    if (attributes.type) parts.push(attributes.type);
    if (attributes.item) parts.push(attributes.item);
    if (attributes.subitem) parts.push(attributes.subitem);
    return parts.map(customKebabCase).join('-');
  },
};

export const ShadowBoxNameTransform = {
  name: "name/shadow-box/kebab",
  type: "name",
  filter: (prop) =>
    prop.attributes &&
    prop.attributes.category === "shadow" &&
    prop.attributes.type === "box",
  transform: (prop) => {
    const { attributes } = prop;
    const parts = [];
    if (attributes.category) parts.push(attributes.category);
    if (attributes.item) parts.push(attributes.item);
    if (attributes.subitem) parts.push(attributes.subitem);
    return parts.map(customKebabCase).join('-');
  }
};

export const ColorCSSTransform = {
  name: "color/css",
  type: "value",
  transitive: true,
  filter: (prop) => isColor(prop),
  transform: (prop) => {
    const { value, modify = [] } = prop;
    let color = chroma(value);
    modify.forEach(({ type, amount }) => {
      color = color[type](amount);
    });
    color = modify.length === 0 ? color.hex() : `rgba(${color.rgba().join(", ")})`;

    return color;
  },
};

export const StringToNumberTransform = {
  name: "value/number",
  type: "value",
  filter: (prop) => {
    return (
      (prop.attributes.category === "size" &&
        prop.attributes.type === "lineHeight") ||
      (prop.attributes.category === "font" && prop.attributes.type === "weight")
    );
  },
  transform: (prop) => {
    return Number(prop.original.value);
  },
};

export const ScssMapSpacingBlockTransform = {
  name: "sass/spacing-block",
  type: "name",
  filter: (prop) => isBlockSpacing(prop),
  transform: (prop) => {
    return _.upperFirst(prop.name.replace("rds-size-spacing-block-", ""));
  }
};
