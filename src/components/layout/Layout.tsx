import React from "react";
import { Footer } from "./Footer";
import Header from "./Header";

export const Layout: React.FC = ({ children }) => {
  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
      <Header />
      <main style={{ margin: 10 }}>{children}</main>
      <Footer />
    </div>
  );
};
