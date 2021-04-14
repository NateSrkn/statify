import React from "react";

export function Table({ tableHeader, children }) {
  return (
    <div>
      <tbody>{children}</tbody>
    </div>
  );
}
