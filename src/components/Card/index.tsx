import { FC } from "react";
import Image from "next/image";
export const Card: FC<{
  title: string;
  secondaryContent: string;
  image: string;
}> = ({ title, image, secondaryContent }) => {
  return (
    <div
      aria-expanded="false"
      style={{
        borderRadius: 4,
        background: "var(--off-black)",
        padding: 15,
        flex: 1,
      }}
    >
      <div draggable="true" style={{ height: "100%" }}>
        <div style={{ marginBottom: 10, position: "relative" }}>
          <div
            style={{
              paddingBottom: "100%",
              position: "relative",
              width: "100%",
              boxShadow: "0 8px 24px rgb(0 0 0 / 50%)",
              marginBottom: 15,
            }}
          >
            <div style={{ overflow: "hidden" }}>
              {image && (
                <Image
                  aria-hidden="false"
                  draggable="false"
                  loading="lazy"
                  src={image}
                  alt={title}
                  layout="fill"
                  className="image"
                />
              )}
            </div>
          </div>
        </div>
        <div>
          <div className="one-line tk-new-spirit" style={{ fontWeight: 500 }}>
            {title}
          </div>
          <div className="one-line">{secondaryContent}</div>
        </div>
      </div>
    </div>
  );
};
