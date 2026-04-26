import React from "react";
import { kebabCase, camelCase, upperFirst } from "lodash";

import "./_token-table.scss";
import TokenExample from "./TokenExample";

const TokenTable = ({ tokens }) => {
  const rows = tokens.map((token, i) => (
    <tr key={i}>
      <td>
        <code>$rds-{kebabCase(token.path)}</code>
      </td>
      <td>
        <code>var(--rds-{kebabCase(token.path)})</code>
      </td>
      <td>
        <code>{upperFirst(camelCase(token.path))}</code>
      </td>
      <td>
        <TokenExample token={token} />
        <div className="TokenTable-label">{token.value}</div>
      </td>
    </tr>
  ));

  return (
    <table className="TokenTable">
      <thead>
        <tr>
          <th>Token (Sass)</th>
          <th>Token (CSS)</th>
          <th>Token (JS)</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
};

export default TokenTable;
