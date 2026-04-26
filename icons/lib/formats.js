import { load } from "cheerio";
import fs from "fs";
import _ from "lodash";

const reactSvgTemplate = fs.readFileSync(
  "./lib/templates/react-svg.template",
  "utf8"
);
const reactSvgComponentTemplate = fs.readFileSync(
  "./lib/templates/react-svg-component.template",
  "utf8"
);
const reactSvgIndexTemplate = fs.readFileSync(
  "./lib/templates/react-svg-index.template",
  "utf8"
);
const magnoliaYamlIcons = fs.readFileSync(
  "./lib/templates/magnolia-yaml-icons.template",
  "utf8"
);
const vueSvgTemplate = fs.readFileSync(
  "./lib/templates/vue-svg.template",
  "utf8"
);

export const SvgSymbolsFormat = {
  name: "svg/symbols",
  format: function ({ dictionary }) {
    var sprite = load("<svg></svg>", { xmlMode: true });
    sprite("svg").attr("xmlns", "http://www.w3.org/2000/svg");

    dictionary.allTokens.forEach((prop) => {
      var symbol = load(`<symbol>${prop.attributes.children}</symbol>`, {
        xmlMode: true,
      });

      symbol("symbol").first().attr("id", `icon-${prop.name}`);
      symbol("symbol").first().attr("viewBox", prop.attributes.viewBox);
      sprite("svg").append(symbol.html());
    });

    return sprite.html();
  },
};

export const ReactSvgComponentFormat = {
  name: "react/svg-component",
  format: function ({ dictionary, options }) {
    const iconName = options?.iconName;
    const component = _.template(reactSvgTemplate, { variable: "token" });
    const template = _.template(reactSvgComponentTemplate, {
      imports: { iconName, component },
    });
    return template({
      allTokens: dictionary.allTokens,
      iconName,
      _,
    });
  },
};

export const ReactSvgIndexFormat = {
  name: "react/svg-index",
  format: function ({ dictionary, options }) {
    if (dictionary) {
      dictionary.allTokens = dictionary.allTokens.map((icon) => ({
        ...icon,
        value: {
          ...icon.value,
          children:
            icon.value.children === "undefined" ? "" : icon.value.children,
        },
      }));
    }
    const component = _.template(reactSvgTemplate, { variable: "icon" });
    const template = _.template(reactSvgIndexTemplate, {
      imports: { component },
    });

    return template({ dictionary, options, _ });
  },
};

export const MagnoliaYamlIconsFormat = {
  name: "magnolia-yaml/icons",
  format: _.template(magnoliaYamlIcons),
};

export const VueSvgFormat = {
  name: "vue/svg",
  format: function ({ dictionary, options }) {
    const template = _.template(vueSvgTemplate);

    return template({ dictionary, options, _ });
  },
};
