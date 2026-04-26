import React from "react";

import Tokens from "../../dist/properties";
import TokenTable from "../../doc/TokenTable";

export default {
  title: "Design System/Tokens",
};

function extractTokenObjects(tree) {
  if ("value" in tree) {
    return [tree];
  }

  return Object.values(tree)
    .map((branch) => extractTokenObjects(branch))
    .flat(1);
}

export const Raw = {
  render: () => <pre>{JSON.stringify(Tokens, null, 2)}</pre>,
};

export const Table = {
  render: () => <TokenTable tokens={extractTokenObjects(Tokens)} />,
};
