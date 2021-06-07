import { motion } from "framer-motion";
import { FC } from "react";

export const MiniCard: FC<{
  title: string;
  image: string;
  secondaryContent?: string;
}> = ({ title, image, secondaryContent }) => {
  return (
    <motion.div
      style={{
        height: 100,
        display: "flex",
        background: "var(--off-black)",
        color: "var(--light-blue)",
        overflow: "hidden",
        borderRadius: 4,
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
      }}
    >
      <motion.div style={{ flex: "none", minHeight: 80, minWidth: 80 }}>
        <div
          style={{
            width: 100,
            height: 100,
            boxShadow: "0 8px 24px rgb(0 0 0 / 50%)",
          }}
        >
          <img
            src={image}
            alt={title}
            height={100}
            width={100}
            style={{ aspectRatio: "1 /1 " }}
          />
        </div>
      </motion.div>
      <motion.div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: secondaryContent ? "flex-start" : "center",
          flex: 1,
          padding: 15,
        }}
      >
        <span className="tk-new-spirit" style={{ fontWeight: 500 }}>
          {title}
        </span>
        {secondaryContent && (
          <span
            style={{
              fontSize: 14,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {secondaryContent}
          </span>
        )}
      </motion.div>
    </motion.div>
  );
};
