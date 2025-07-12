import { Html } from "@react-three/drei";
import { useState } from "react";

const TitleAd = ({ title, position }) => {
  return (
    <Html fullscreen zIndexRange={100} position={position} transform={true}>
      <h3
        style={{
          position: position,
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "0.2rem 0.2rem",
          borderRadius: "0.5rem",
          fontSize: "0.28rem",
          zIndex: 10,
        }}
      >
        {title}
      </h3>
    </Html>
  );
};

export default TitleAd;
