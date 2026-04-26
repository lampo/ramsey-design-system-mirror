import { createRequire } from "module";
const require = createRequire(import.meta.url);

const blockSpacingMap = require("../properties/size/spacing.json");

export function createColorSorter(order = []) {
  const colorSorter = ({ attributes: attrA }, { attributes: attrB }) => {
    const { item: itemA = "" } = attrA;
    const { item: itemB = "" } = attrB;

    const indexOfA = order.indexOf(itemA);
    const indexOfB = order.indexOf(itemB);

    if (indexOfA === -1 || indexOfB === -1) return -1;

    let sortValue = indexOfA - indexOfB;

    if (sortValue === 0) {
      const { subitem: subitemA = "0" } = attrA;
      const { subitem: subitemB = "0" } = attrB;

      sortValue = parseInt(subitemA, 10) - parseInt(subitemB, 10);
    }
    return sortValue;
  };

  return colorSorter;
}

/**
 * Formats a token type's items into a minimal object containing only the items, subitems,
 * and the their transformed values.
 *
 * Optionally flattens the subitem value into the item level.
 *
 * @param {Object} items - A token type's items object
 * @param {boolean} [flatten] - Specifies whether subitem should be flattened to the item level. `true` by default
 * @returns {Object} An object in the formats:
 *
 * {
 *    item: value,
 *    item-subitem: value
 * }
 *
 * {
 *    item: value,
 *    item: {
 *      subitem: value
 *    }
 * }
 *
 * @example
 *
 *    formatTokenItems(tokens.size.font)
 *    formatTokenItems(tokens.size.font, false)
 */

function formatTokenItems(items, flatten = true) {
  const itemReducer = (itemsObj, [itemName, item]) =>
    item.attributes
      ? { ...itemsObj, [itemName]: item.value }
      : { ...itemsObj, [itemName]: formatTokenItems(item, flatten) };

  const flattenItemReducer = (itemsObj, [, item]) => {
    const { attributes } = item;
    if (attributes) {
      const key =
        attributes.subitem && attributes.subitem !== "_"
          ? `${attributes.item}-${attributes.subitem}`
          : attributes.item;
      return { ...itemsObj, [key]: item.value };
    }

    return { ...itemsObj, ...formatTokenItems(item, flatten) };
  };

  return Object.entries(items).reduce(
    flatten ? flattenItemReducer : itemReducer,
    {}
  );
}

/**
 * Formats a token type's items into a minimal object containing only the items, subitems,
 * and the their transformed values then converts it to a string without enclosing brackets
 * for easy use within templates.
 *
 * @param {Object} items - A token type's items object
 * @param {boolean} [flatten] - Specifies whether subitem should be flattened to the item level. `true` by default
 * @returns {string} A stringified and formatted token type's items object without enclosing brackets
 *
 * @example
 *
 *    printTokenItems(tokens.size.font)
 *    printTokenItems(tokens.size.font, false)
 */

export function printTokenItems(items, flatten = true) {
  const formattedItems = formatTokenItems(items, flatten);

  const itemsStr = JSON.stringify(formattedItems);
  return itemsStr.slice(1, itemsStr.length - 1);
}

/**
 * Formats the spacing block Magnolia dialog option label into the full T-Shirt name
 *
 * @param {string} size
 * @param {Map} fullLabelsMap
 * @returns {string} A stringified and formatted label for each Block spacing options for a Magnolia dialog field
 *
 * Block 2XSmall (2px)
 */

export function printFullSpacingBlockLabel(size, fullLabelsMap) {
  return `Block ${fullLabelsMap.get(size)} (${
    blockSpacingMap.size.spacing.block[size].value
  }px)`;
}

function getTokenValue(token) {
  if (typeof token.value === "object" && token.value !== null) {
    return token.value.value;
  }
  return token.value;
}

const tokenFormatters = [
  {
    matcher: token =>
      token.attributes &&
      token.attributes.category === "size" &&
      token.attributes.type === "font",
    formatter: token => {
      const tokenValue = getTokenValue(token);
      const tokenName = token.name.replace('font', 'text');
      let cssVariable = [`  --${tokenName}: ${tokenValue};`];
      if (token.lineHeight !== undefined){
        cssVariable.push(`  --${tokenName}-line-height: ${token.lineHeight};`);
      }
      return cssVariable.join('\n');
    }
  },
];

function defaultTokenFormatter(token) {
  const tokenValue = getTokenValue(token);
  return `  --${token.name}: ${tokenValue};`;
}

function formatCssToken(token) {
  for (const { matcher, formatter } of tokenFormatters) {
    if (matcher(token)) {
      return formatter(token);
    }
  }
  return defaultTokenFormatter(token);
}

export function printCssTokens(tokens) {
  const formattedTokens = Object.values(tokens)
    .map(formatCssToken)
    .join('\n');

  return formattedTokens;
}
