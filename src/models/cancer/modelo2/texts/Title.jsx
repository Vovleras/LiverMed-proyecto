import { Html } from "@react-three/drei";
import { useState } from "react";

const Title = ({ title, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Html
      transform={false}
      occlude={false}
      style={{
        position: "fixed",
        top: "-310px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: "transparent",
          color: hovered ? "#404a6e" : "#0d1533",
          fontSize: "40px",
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
      </button>
    </Html>
  );
};

export default Title;
