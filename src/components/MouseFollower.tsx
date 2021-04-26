import React, { useContext, useEffect, useRef, useState } from "react";
import { MousePositionContext } from "./MouseTracker";

export const MouseFollower: React.FC<{ isOffset?: boolean }> = ({
  isOffset = true,
  children,
}) => {
  const { x, y } = useContext(MousePositionContext);
  const [dimensions, setDimensions] = useState({ height: 0, width: 0 });
  const ref = useRef({
    offsetWidth: 0,
    offsetHeight: 0,
  });
  useEffect(() => {
    setDimensions({
      width: ref.current.offsetWidth / 2,
      height: ref.current.offsetHeight / 2,
    });
  }, []);

  return (
    <div
      style={{
        top: `${y - dimensions.height + (isOffset ? 25 : 0)}px`,
        left: `${x - dimensions.width}px`,
      }}
      className="mouse-follower"
      ref={ref}
    >
      {children}
    </div>
  );
};
