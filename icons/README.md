# `@ramsey-design-system/icons`

> Icons for the Ramsey Design System

## Installation

```bash
yarn add @ramsey-design-system/icons
```

## Usage

The Yarn package includes SVG icon files, both individually and as a sprite.

- Individual icons: `@ramsey-design-system/icons/dist/svg/*`, e.g. `menu.svg`
- Sprite: `@ramsey-design-system/icons/dist/ramsey-icons.svg`

You can copy those files out of the project and use them however you need. The individual files can be used as an image `src` or inline SVGs. The recommended approach is to copy the sprite into your static assets directory and reference the icons from the external file with a `<use>` element. This way it will be cached just like any other static asset.

> :warning: You'll need to use a polyfill for IE11 like svg4everybody or svgxuse in order to follow our recommended approach.

## Contributing

If you are looking to add a new icon or update an existing icon, follow these steps:

1. Export the icon SVG from [Figma](https://www.figma.com/file/M0bomsdNrpXJvutfrHllzp/RDS-Icons?node-id=0%3A412).

2. For an existing icon, replace the current SVG file in `icons/src/svg` with the new exported file. For a new icon, simply paste the new SVG file into that same folder.

3. Run [svgo](https://github.com/svg/svgo) to optimize the SVG file. Make sure you are in the `icons/` directory and run the following command:

```bash
yarn optimize
```

4. Make sure your SVG markup looks similar to this [example SVG](https://github.com/lampo/ramsey-design-system/blob/04321025c209793493aee5427c3234c6a7a08999/icons/src/svg/video.svg?short_path=b7ef70d).
