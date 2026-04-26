import React from "react";
import * as Icons from "../../dist/index.esm.js";

export default {
  title: "Design System/Icons",
};

export const All = {
  render: () => {
    const icons = Object.entries(Icons).map(([name, Icon], i) => (
      <div
        key={i}
        style={{
          padding: "16px 8px",
          border: "1px solid #d5d9db",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <Icon width={32} height={32} />
        <p style={{ margin: "8px 0 0", fontSize: "12px" }}>{name}</p>
      </div>
    ));
    return (
      <div
        style={{
          display: "grid",
          gridGap: "8px",
          gridTemplateColumns: "repeat(auto-fill, 160px)",
        }}
      >
        {icons}
      </div>
    );
  },
};
