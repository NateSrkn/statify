import React from "react";
import { Footer } from "./Footer";
import Header from "./Header";

export const Layout: React.FC = ({ children }) => {
  const pageMargin = "20px";
  return (
    <div>
      <Header />
      <main style={{ margin: pageMargin, background: "var(--blue)" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
};
