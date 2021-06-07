import React from "react";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--light-blue)",
        padding: "15px 15px 10px 15px",
        margin: "0 10px",
      }}
    >
      <h3
        style={{
          fontSize: "calc(24px + 0.9vw)",
          color: "var(--light-blue)",
        }}
      >
        Statify
      </h3>
    </header>
  );
}
