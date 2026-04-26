import StyleDictionary from "style-dictionary";
import {
  SizePxTransform,
  SizePxToEmTransform,
  MagnoliaYamlColorsTransform,
  TailwindFontSizeTransform,
  ColorCSSTransform,
  StringToNumberTransform,
  TailwindFontFamilyTransform,
  TailwindCssColorsTransform,
  TailwindCssSizeTransform,
  TailwindCssFontSizeTransform,
  TailwindCssFontFamilyTransform,
  ShadowBoxNameTransform,
  NameItemCamelTransform,
} from "./lib/transforms.mjs";
import {
  ScssMixinsMediaQueryFormat,
  MagnoliaYamlColorsFormat,
  TailwindPresetFormat,
  TailwindCssVariablesFormat,
  SpacingUtilitiesFormat,
  MagnoliaYamlSpacingBlockFormat,
  ScssMapsColorFormat,
  TypeScriptColorFormat,
  ScssMapsSpacingBlockFormat, 
  TypeScriptSpacingBlockFormat,
  TypeScriptBreakpointFormat
} from "./lib/formats.mjs";
import {
  MagnoliaYamlColorsFilter,
  CssSpacingFilter,
  GeneralSpacingBlockFilter,
} from "./lib/filters.mjs";

// Create instance with initial configuration that includes all built-in transforms/formats
const sd = new StyleDictionary({
  // Set log level
  log: {
    warnings: 'warn', // 'error' | 'warn' | 'success' | 'info' | 'verbose'
    verbosity: 'default', // 'default' | 'silent' | 'verbose'  
  },
  // Include built-in hooks
  hooks: {
    transforms: {},
    formats: {},
    filters: {}
  }
});

// Register Custom Transformers
sd.registerTransform(SizePxTransform);
sd.registerTransform(SizePxToEmTransform);
sd.registerTransform(StringToNumberTransform);
sd.registerTransform(ColorCSSTransform);
sd.registerTransform(NameItemCamelTransform);
sd.registerTransform(MagnoliaYamlColorsTransform);
sd.registerTransform(TailwindFontSizeTransform);
sd.registerTransform(TailwindFontFamilyTransform);
sd.registerTransform(TailwindCssColorsTransform);
sd.registerTransform(TailwindCssSizeTransform);
sd.registerTransform(TailwindCssFontSizeTransform);
sd.registerTransform(TailwindCssFontFamilyTransform);
sd.registerTransform(ShadowBoxNameTransform);

// Register Formatters
sd.registerFormat(ScssMixinsMediaQueryFormat);
sd.registerFormat(ScssMapsColorFormat);
sd.registerFormat(ScssMapsSpacingBlockFormat);
sd.registerFormat(TypeScriptColorFormat);
sd.registerFormat(TypeScriptSpacingBlockFormat);
sd.registerFormat(TypeScriptBreakpointFormat);
sd.registerFormat(MagnoliaYamlColorsFormat);
sd.registerFormat(TailwindPresetFormat);
sd.registerFormat(TailwindCssVariablesFormat);
sd.registerFormat(SpacingUtilitiesFormat);
sd.registerFormat(MagnoliaYamlSpacingBlockFormat);

// Register Filters
sd.registerFilter(GeneralSpacingBlockFilter);
sd.registerFilter(MagnoliaYamlColorsFilter);
sd.registerFilter(CssSpacingFilter);

const extendedSd = await sd.extend({
  source: ["properties/**/*.json"],
  platforms: {
    css: {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "color/css",
        "size/px",
        "size/pxToEm",
      ],
      prefix: "rds",
      buildPath: "dist/",
      files: [
        {
          destination: "_mixins.scss",
          format: "scss/mixins/media-query",
          filter: {
            attributes: {
              type: "breakpoint",
            },
          },
        },
        {
          destination: "_maps.scss",
          format: "scss/maps/color",
          filter: {
            attributes: {
              category: "color",
              type: "base",
            },
          },
        },
        {
          destination: "_spacing-block-map.scss",
          format: "scss/maps/spacing-block",
          filter: "general/spacing-block-filter"
        },
        {
          destination: "_variables.scss",
          format: "scss/variables",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "_custom-properties.scss",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "tokens.css",
          format: "css/variables",
          options: {
            outputReferences: true,
          },
        },
        {
          destination: "spacing-utilities.css",
          format: "css/utilities/spacing",
          filter: "css/utilities/spacing-filter",
        },
      ],
    },
    json: {
      transforms: [
        "attribute/cti",
        "name/pascal",
        "color/css",
        "value/number",
        "size/px",
        "size/pxToEm",
      ],
      buildPath: "dist/",
      files: [
        {
          format: "json",
          destination: "properties.json",
        },
        {
          format: "json/flat",
          destination: "main.json",
        },
      ],
    },
    "magnolia-yaml": {
      transforms: ["attribute/cti", "name/i/kebab"],
      buildPath: "dist/",
      files: [
        {
          destination: "magnolia/colors.yaml",
          format: "magnolia-yaml/colors",
          filter: "magnolia-yaml/colors-filter",
        },
        {
          destination: "magnolia/spacing-block.yaml",
          format: "magnolia-yaml/spacing-block",
          filter: "general/spacing-block-filter",
        },
      ],
    },
    tailwind: {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "color/css",
        "size/px",
        "size/pxToEm",
        "size/fontWithLineHeight",
        "font/fontStackAsArray",
      ],
      buildPath: "dist/",
      files: [
        {
          destination: "tailwind-preset.js",
          format: "tailwind/preset",
        },
      ],
    },
    tailwindCss: {
      transforms: [
        "attribute/cti",
        "name/kebab",
        "name/ci/kebab",
        "name/shadow-box/kebab",
        "color/css",
        "size/px",
        "size/pxToEm",
        "size/cssFontWithLineHeight",
        "size/noCategory",
        "font/fontCssName",
      ],
      buildPath: "dist/",
      files: [
        {
          destination: "tailwind-css-variables.css",
          format: "tailwind/variables",
        },
      ],
    },
    typescript: {
      transforms: ["attribute/cti", "name/i/camel", "size/pxToEm"],
      buildPath: "dist/",
      files: [
        {
          destination: "types/color.ts",
          format: "typescript/color",
          filter: {
            attributes: {
              category: "color",
              type: "base",
            },
          },
        },
        {
          destination: "types/spacing-block.ts",
          format: "typescript/spacing-block",
          filter: "general/spacing-block-filter"
        },
        {
          destination: "types/breakpoint.ts",
          format: "typescript/breakpoint",
          filter: {
            attributes: {
              category: "size",
              type: "breakpoint",
            },
          },
        }
      ],
    },
  },
});

await extendedSd.buildAllPlatforms();
