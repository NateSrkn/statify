import { Layout } from "./layout/Layout";
import { signIn } from "next-auth/client";
export const LandingPage = () => {
  return (
    <Layout>
      <div
        style={{
          fontFamily: "new-spirit",
          color: "var(--light-blue)",
          fontSize: "calc(16px + 0.9vw)",
          minHeight: "50vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div style={{ margin: "0 auto" }}>
          <p>
            Welcome to Statify, <br />a simple way to track your tracks
          </p>
          <button
            className="border"
            onClick={() => signIn("spotify")}
            style={{
              display: "inline-flex",
              border: "none",
              background: "none",
              fontSize: "inherit",
              fontFamily: "inherit",
              color: "inherit",
              cursor: "pointer",
              width: "max-content",
              margin: "15px auto 0 auto",
            }}
          >
            Get started
          </button>
        </div>
      </div>
    </Layout>
  );
};
