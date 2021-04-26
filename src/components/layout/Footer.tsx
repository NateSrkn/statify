import Link from "next/link";
export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        margin: "0 20px",
        display: "flex",
        justifyContent: "flex-end",
        position: "fixed",
      }}
    >
      <h5>
        Created by{" "}
        <span className="border">
          <Link href="https://www.nathansorkin.com">Nathan Sorkin</Link>
        </span>
      </h5>
    </footer>
  );
};
