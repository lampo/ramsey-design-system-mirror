import React from "react";
import { merge as _merge } from "lodash/object";

import TokenStrategies from "./token-strategies";

const TokenExample = ({ token }) => {
  const props = TokenStrategies.map((transform) => transform(token)).reduce(
    (obj, transform) => _merge(obj, transform),
    { style: { marginBottom: "8px" } }
  );

  if (Object.keys(props).length === 0) {
    return null;
  }

  return <div {...props}></div>;
};

export default TokenExample;
