import { Html } from "@react-three/drei";

const TitleAd = ({ title, position, onClick }) => {
  return (
    <Html fullscreen zIndexRange={100} position={position} transform={true}>
      <button
        style={{
          position: position,
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "0.18rem 0.18rem 0.18rem 0.18rem",
          borderRadius: "0.5rem",
          fontSize: "0.23rem",
          zIndex: 10,
        }}
        onClick={onClick}
      >
        {title}
      </button>
    </Html>
  );
};

export default TitleAd;