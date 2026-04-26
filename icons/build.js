import StyleDictionary from "style-dictionary";
import config from "./config.js";
import {
  AssetSvgTransform,
  AssetSvgDataUriTransform,
  AssetSvgPropsTransform,
  AssetSvgPropsReactTransform,
  NameTIKebabTransform,
  NameITPascalTransform,
  ReactSVGTransformGroup,
  VueSVGTransformGroup,
} from "./lib/transforms.js";
import {
  SvgSymbolsFormat,
  ReactSvgComponentFormat,
  ReactSvgIndexFormat,
  MagnoliaYamlIconsFormat,
  VueSvgFormat,
} from "./lib/formats.js";

const sd = new StyleDictionary();

sd.registerTransform(AssetSvgTransform);
sd.registerTransform(AssetSvgDataUriTransform);
sd.registerTransform(AssetSvgPropsTransform);
sd.registerTransform(AssetSvgPropsReactTransform);
sd.registerTransform(NameTIKebabTransform);
sd.registerTransform(NameITPascalTransform);
sd.registerTransformGroup(ReactSVGTransformGroup);
sd.registerTransformGroup(VueSVGTransformGroup);
sd.registerFormat(SvgSymbolsFormat);
sd.registerFormat(ReactSvgComponentFormat);
sd.registerFormat(ReactSvgIndexFormat);
sd.registerFormat(MagnoliaYamlIconsFormat);
sd.registerFormat(VueSvgFormat);

const extendedSd = await sd.extend(config);
await extendedSd.buildAllPlatforms();
