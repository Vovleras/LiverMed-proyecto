import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const Salad = ({ scale = [1, 1, 1], position = [0, 0, 0] }) => {
  const { scene } = useGLTF("/models-3d/models-higadoGraso/salad.glb");
  const modelRef = useRef();
  const direction = useRef(1); // Dirección de movimiento

  const [animate, setAnimate] = useState(true);
  const [hovered, setHovered] = useState(false);

  //  Materiales
  useEffect(() => {
    if (scene)
      scene.traverse((c) => {
        if (c.isMesh) {
          c.castShadow = true;
          c.receiveShadow = true;
          c.material.metalness = 0.2;
          c.material.roughness = 0.7;
        }
      });
  }, [scene]);

  // Movimiento de izquierda a derecha
  useFrame(() => {
    if (animate && modelRef.current) {
      modelRef.current.position.x += 0.02 * direction.current;
      if (modelRef.current.position.x > 0.5) direction.current = -1;
      if (modelRef.current.position.x < -0.5) direction.current = 1;
    }
  });

  //  Controlar animación con tecla 'e'
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "e") {
        setAnimate((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <group
      ref={modelRef}
      scale={scale}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={scene} />
    </group>
  );
};

export default Salad;