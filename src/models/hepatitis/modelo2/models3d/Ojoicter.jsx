import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const Ojoicter = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models-3d/models-hepatitis/ojoicter.glb");

  // Animación de rotación
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.8;
    }
  });

  // Activar sombras en todas las mallas del modelo
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = false;
      }
    });
  }, [scene]);

  // Render del modelo con escala aumentada
  return (
    <primitive
      ref={modelRef}
      object={scene}
      position={[0, 0.5, 0]}
      scale={2} // Aumenta el tamaño del modelo al doble
    />
  );
};

export default Ojoicter;


