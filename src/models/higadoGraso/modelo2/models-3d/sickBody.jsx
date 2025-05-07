import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const SickBody = ({ scale = [1, 1, 1], position = [0, 0, 0] }) => {
  const { scene } = useGLTF("/models-3d/models-higadoGraso/sickBody.glb");
  const modelRef = useRef();
  const [animate, setAnimate] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 0.2;
          child.material.roughness = 0.7;
          child.material.color.set("lightgray");
        }
      });
    }
  }, [scene]);

  // Tecla A para animación
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "a") setAnimate((prev) => !prev);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Animación vertical
  useFrame(() => {
    if (animate && modelRef.current) {
      modelRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.2 + position[1];
    }
  });

  // Solo cambia el cursor
  useEffect(() => {
    document.body.style.cursor = hovered ? "pointer" : "auto";
    return () => (document.body.style.cursor = "auto");
  }, [hovered]);

  const handlePointerOver = () => setHovered(true);
  const handlePointerOut = () => setHovered(false);

  if (!scene) return null;

  return (
    <primitive
      object={scene}
      ref={modelRef}
      scale={scale}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
    />
  );
};

export default SickBody;
