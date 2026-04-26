 
 
import fs from "fs";
import _ from "lodash";
import StyleDictionary from "style-dictionary";
import { fileHeader } from "style-dictionary/utils";
import {
  createColorSorter,
  printTokenItems,
  printCssTokens,
  printFullSpacingBlockLabel,
} from "./helpers.mjs";
import {
  BASE_COLOR_ORDER,
  TAILWIND_SPACING_SCALE,
  TSHIRT_SIZE_FULL_LABELS_MAP,
} from "./constants.mjs";
import {NameItemCamelTransform, ScssMapSpacingBlockTransform} from "./transforms.mjs";

 
const magnoliaYamlColorsTemplate = fs.readFileSync(
  "./lib/templates/magnolia-yaml-colors.template"
);

const baseColorSorter = createColorSorter(BASE_COLOR_ORDER);

export const MagnoliaYamlColorsFormat = {
  name: "magnolia-yaml/colors",
  format: _.template(magnoliaYamlColorsTemplate, {
    imports: { baseColorSorter },
  }),
};

const scssMixinMediaQueryTemplate = fs.readFileSync(
  "./lib/templates/scss-mixin-media-query.template"
);

export const ScssMixinsMediaQueryFormat = {
  name: "scss/mixins/media-query",
  format: _.template(scssMixinMediaQueryTemplate),
};

const tailwindPresetTemplate = fs.readFileSync(
  "./lib/templates/tailwind-preset.template"
);

export const TailwindPresetFormat = {
  name: "tailwind/preset",
  format: function ({ dictionary }) {
    const template = _.template(tailwindPresetTemplate, {
      imports: { printTokenItems, TAILWIND_SPACING_SCALE },
    });
    return template(dictionary);
  },
};

const tailwindCssVariablesTemplate = fs.readFileSync(
  "./lib/templates/tailwind-css-variables.template"
);

export const TailwindCssVariablesFormat = {
  name: "tailwind/variables",
  format: function ({ dictionary }) {
    const template = _.template(tailwindCssVariablesTemplate, {
      imports: { printCssTokens },
    });
    return template(dictionary);
  },
};

const spacingUtilitiesTemplate = fs.readFileSync(
  "./lib/templates/spacing-utilities.template"
);

export const SpacingUtilitiesFormat = {
  name: "css/utilities/spacing",
  format: function ({ dictionary }) {
    const template = _.template(spacingUtilitiesTemplate);
    return template(dictionary);
  },
};

const magnoliaYamlSpacingBlockTemplate = fs.readFileSync(
  "./lib/templates/magnolia-yaml-spacing-block.template"
);

export const MagnoliaYamlSpacingBlockFormat = {
  name: "magnolia-yaml/spacing-block",
  format: function ({ dictionary }) {
    const template = _.template(magnoliaYamlSpacingBlockTemplate, {
      imports: {
        printFullSpacingBlockLabel,
        TSHIRT_SIZE_FULL_LABELS_MAP,
      },
    });
    return template(dictionary);
  },
};

export const ScssMapsColorFormat = {  
  name: "scss/maps/color",
  format: async ({ dictionary, file }) => {
    const colorMap = Object.values(dictionary.allTokens).map(
      (color) =>
        `"${NameItemCamelTransform.transform(color)}": ${color.value}`
    );
    const header = await fileHeader({ file });
    return `${header}$rds-colors: (\n${colorMap.join(",\n")}\n);`;
  },
};

export const TypeScriptColorFormat = {
  name: "typescript/color",
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({
      file,
    });
    const colorNames = Object.values(dictionary.allTokens).map(
      (color) => color.name
    );

    return `${header}export const rdsColors = ${JSON.stringify(
      colorNames
    )} as const;\nexport type RdsColor = (typeof rdsColors)[number];`;
  },
};

export const ScssMapsSpacingBlockFormat = {
  name: "scss/maps/spacing-block",
  format: async ({ dictionary, file }) => {
    const spacingBlockMap = Object.values(dictionary.allTokens).map(
      (sb) =>
        `"${ScssMapSpacingBlockTransform.transform(sb)}": ${sb.value}`);
    const header = await fileHeader({ file });
    return `${header}$rds-spacing-block: (\n${spacingBlockMap.join(",\n")}\n)`
  }
};

export const TypeScriptSpacingBlockFormat = {
  name: "typescript/spacing-block",
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const spacingBlockNames = Object.values(dictionary.allTokens).map((sb) => sb.name);

    return `${header}export const rdsSpacingBlock = ${JSON.stringify(spacingBlockNames)} as const;\nexport type RdsSpacingBlock = (typeof rdsSpacingBlock)[number];`
  }
};

export const TypeScriptBreakpointFormat = {
  name: "typescript/breakpoint",
  format: async ({ dictionary, file }) => {
    const header = await fileHeader({ file });
    const breakpoints = Object.values(dictionary.allTokens);
    const breakpointNames = breakpoints.map((bp) => bp.attributes.item);
    const screens = breakpoints.reduce((acc, token) => {
      acc[token.attributes.item] = `${token.value}`;
      return acc;
    }, {});
    const rdsBreakpoints = `export const rdsBreakpoints = ${JSON.stringify(breakpointNames)} as const;\n`;
    const rdsBreakpointType = `export type RdsBreakpoint = (typeof rdsBreakpoints)[number];\n\n`;
    const rdsBreakpointValues = `export const rdsBreakpointValues = ${JSON.stringify(screens, null, 2)};`;

    return `${header}${rdsBreakpoints}${rdsBreakpointType}${rdsBreakpointValues}`;
  }
};
