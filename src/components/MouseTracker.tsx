import React, { useState, createContext, MouseEvent } from "react";

export const MousePositionContext = createContext({ x: 0, y: 0, target: null });

export const MouseTracker: React.FC = ({ children }) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
    target: null,
  });
  const handleMousePosition = (event: MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.pageX, y: event.pageY, target: event.target });
  };
  return (
    <MousePositionContext.Provider value={mousePosition}>
      <div
        onMouseMove={handleMousePosition}
        style={{ backgroundColor: "var(--black)" }}
        aria-label="Container to track the mouse position"
      >
        {children}
      </div>
    </MousePositionContext.Provider>
  );
};
