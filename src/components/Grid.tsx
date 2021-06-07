import React from "react";

export default function Grid({ minColumnSize = 150, children }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(auto-fill, minmax(${minColumnSize}px, 1fr))`,
      }}
    >
      {children}
    </div>
  );
}
