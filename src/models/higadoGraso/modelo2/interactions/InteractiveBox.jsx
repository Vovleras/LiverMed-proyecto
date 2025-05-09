import { useRef, useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const InteractiveBox = () => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [positionY, setPositionY] = useState(0);

  // Animación sencilla: rebote
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = 0.5 + Math.sin(Date.now() * 0.002) * 0.2;
    }
  });

  // Evento de teclado 3D
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "r") {
        setClicked(!clicked);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [clicked]);

  return (
    <mesh
      ref={meshRef}
      position={[2, 0.5, 0]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
      scale={clicked ? 1.5 : 1}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
      {/* Elemento HTML 3D */}
      <Html distanceFactor={10}>
        <button style={{ padding: "0.5rem", borderRadius: "8px" }}>
          Click aquí
        </button>
      </Html>
    </mesh>
  );
};

export default InteractiveBox;
