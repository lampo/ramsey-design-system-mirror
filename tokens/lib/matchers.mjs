export const isBorderRadius = (token) =>
  token.attributes.category === "size" && token.attributes.type === "radius";

export const isBorderSize = (token) =>
  token.attributes.category === "size" && token.attributes.type === "border";

export const isBreakpoint = (token) =>
  token.attributes.category === "size" &&
  token.attributes.type === "breakpoint";

export const isColor = (token) => token.attributes.category === "color";

export const isSize = (token) => token.attributes.category === "size";

export const isFontFamily = (token) =>
  token.attributes.category === "font" && token.attributes.type === "family";

export const isFontSize = (token) =>
  token.attributes.category === "size" && token.attributes.type === "font";

export const isIconSize = (token) =>
  token.attributes.category === "size" && token.attributes.type === "icon";

export const isFontWeight = (token) =>
  token.attributes.category === "font" && token.attributes.type === "weight";

export const isLineHeight = (token) =>
  token.attributes.category === "size" &&
  token.attributes.type === "lineHeight";

export const isBoxShadow = (token) =>
  token.attributes.category === "shadow" && token.attributes.type === "box";

export const isSpacing = (token) =>
  token.attributes.category === "size" && token.attributes.type === "spacing";

export const isSpacingUtility = (token) =>
  isSpacing(token) && !["none", "basis"].includes(token.attributes.item);

export const isMagnoliaColor = (token) =>
  isColor(token) &&
  token.attributes.type === "base" &&
  token.attributes.item !== "black";

export const isBlockSpacing = (token) =>
  isSpacing(token) && token.attributes.item === "block";

export const isInlineSpacing = (token) =>
  isSpacing(token) && token.attributes.item === "inline";

export default {
  isBlockSpacing,
  isBorderRadius,
  isBorderSize,
  isBreakpoint,
  isColor,
  isFontFamily,
  isFontSize,
  isIconSize,
  isFontWeight,
  isInlineSpacing,
  isLineHeight,
  isBoxShadow,
  isMagnoliaColor,
  isSpacing,
  isSpacingUtility,
};
