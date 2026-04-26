import {
  isMagnoliaColor,
  isSpacingUtility,
  isBlockSpacing,
} from "./matchers.mjs";

export const MagnoliaYamlColorsFilter = {
  name: "magnolia-yaml/colors-filter",
  filter: (prop) => isMagnoliaColor(prop),
};

export const CssSpacingFilter = {
  name: "css/utilities/spacing-filter",
  filter: (prop) => isSpacingUtility(prop),
};

export const GeneralSpacingBlockFilter = {
  name: "general/spacing-block-filter",
  filter: (prop) => isBlockSpacing(prop),
};
