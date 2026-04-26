import Tokens from "../dist/properties";
import * as matchers from "../lib/matchers.mjs";
import { RamseyIcon } from "@ramsey-design-system/icons";

export const BoxStrategy = (token) => {
  if (
    !(
      matchers.isColor(token) ||
      matchers.isBorderSize(token) ||
      matchers.isBorderRadius(token)
    )
  ) {
    return {};
  }

  return {
    style: {
      width: "24px",
      height: "24px",
      borderRadius: Tokens.size.radius.sm.value,
    },
  };
};

export const BoxShadowStrategy = (token) => {
  if (!matchers.isBoxShadow(token)) {
    return {};
  }

  return {
    style: {
      width: "32px",
      height: "32px",
      boxShadow: token.value,
    },
  };
};

export const TypographyStrategy = (token) => {
  if (
    !(
      matchers.isFontFamily(token) ||
      matchers.isFontSize(token) ||
      matchers.isFontWeight(token)
    )
  ) {
    return {};
  }

  return {
    style: {
      fontSize: Tokens.size.font["8"].value,
    },
    children: "Aa",
  };
};

export const FilledBoxStrategy = (token) => {
  if (!(matchers.isBorderRadius(token) || matchers.isSpacing(token))) {
    return {};
  }

  return {
    style: {
      backgroundColor: Tokens.color.base.blue["50"].value,
    },
  };
};

export const ColorStrategy = (token) => {
  if (!matchers.isColor(token)) {
    return {};
  }

  return {
    style: {
      border: `${Tokens.size.border.sm.value} solid ${Tokens.color.base.gray["20"].value}`,
      backgroundColor: token.value,
    },
  };
};

export const FontFamilyStrategy = (token) => {
  if (!matchers.isFontFamily(token)) {
    return {};
  }

  return {
    style: {
      fontFamily: token.value,
    },
  };
};

export const FontWeightStrategy = (token) => {
  if (!matchers.isFontWeight(token)) {
    return {};
  }

  return {
    style: {
      fontWeight: token.value,
    },
  };
};

export const BorderSizeStrategy = (token) => {
  if (!matchers.isBorderSize(token)) {
    return {};
  }

  return {
    style: {
      border: `${token.value} solid ${Tokens.color.base.blue["50"].value}`,
    },
  };
};

export const FontSizeStrategy = (token) => {
  if (!matchers.isFontSize(token)) {
    return {};
  }

  return {
    style: {
      fontSize: token.value,
    },
  };
};

export const IconSizeStrategy = (token) => {
  if (!matchers.isIconSize(token)) {
    return {};
  }

  return {
    children: (
      <RamseyIcon
        width={token.value}
        fill={Tokens.color.base.blue["50"].value}
      />
    ),
  };
};

export const LineHeightStrategy = (token) => {
  if (!matchers.isLineHeight(token)) {
    return {};
  }

  return {
    style: {
      lineHeight: token.value,
      width: "160px",
    },
    children: "The quick brown fox jumps over the lazy dog.",
  };
};

export const BorderRadiusStrategy = (token) => {
  if (!matchers.isBorderRadius(token)) {
    return {};
  }

  return {
    style: {
      borderRadius: token.value,
    },
  };
};

export const SpacingStrategy = (token) => {
  if (!matchers.isSpacing(token)) {
    return {};
  }

  const item = token.attributes.item;

  const style = {
    width: token.value,
    height: token.value,
  };

  if (item === "block") {
    style.width = "64px";
  }

  if (item === "inline") {
    style.height = "64px";
  }

  if (item === "inset" || item === "insetSquish") {
    Object.assign(style, {
      width: "64px",
      height: "32px",
      borderWidth: token.value,
      borderStyle: "solid",
      borderColor: Tokens.color.base.blue["50"].value,
      backgroundColor: Tokens.color.base.white.value,
    });
  }

  return { style };
};

const TokenStrategies = [
  BoxStrategy,
  BoxShadowStrategy,
  TypographyStrategy,
  FilledBoxStrategy,
  ColorStrategy,
  FontFamilyStrategy,
  FontWeightStrategy,
  BorderSizeStrategy,
  FontSizeStrategy,
  IconSizeStrategy,
  LineHeightStrategy,
  BorderRadiusStrategy,
  SpacingStrategy,
];

export default TokenStrategies;
