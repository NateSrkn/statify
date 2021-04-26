import React from "react";

export default function Header() {
  return (
    <header
      style={{
        borderBottom: "1px solid var(--black)",
        padding: "15px 15px 10px 15px",
        margin: "0 20px",
      }}
    >
      <h3
        style={{
          fontSize: "calc(24px + 0.9vw)",
        }}
      >
        Statify
      </h3>
    </header>
  );
}
