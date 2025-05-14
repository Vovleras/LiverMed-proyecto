import { Html } from "@react-three/drei";
import { useState } from "react";

const Title = ({ title, onClick, position }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      position={position}
      transform={true}
      style={{
        pointerEvents: "none",
      }}
    >
      <h1
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "transparent",
          color: hovered ? "#404a6e" : "#0d1533",
          fontSize: "15px",
          fontWeight: "bold",
          pointerEvents: "auto",
          transition: "color 0.3s ease",
          padding: "10px",
          fontFamily: "'Unicorn', sans-serif",
          border: "none",
          minWidth: "250px",
          whiteSpace: "nowrap",
          textAlign: "center",
        }}
      >
        {title}
      </h1>
    </Html>
  );
};

export default Title;
