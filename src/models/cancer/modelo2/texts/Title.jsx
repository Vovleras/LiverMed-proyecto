import { Html } from "@react-three/drei";
import { useState } from "react";

const Title = ({ title, onClick, position }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html fullscreen zIndexRange={100} position={position} transform={true}>
      <h1
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "transparent",
          color: hovered ? "#404a6e" : "#0d1533",
          fontSize: "15px",

          pointerEvents: "auto",
          fontFamily: "'Unicorn', sans-serif",

          border: "none",
          zIndex: 10,
        }}
      >
        {title}
      </h1>
    </Html>
  );
};

export default Title;
