import { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

const FattyLiver = () => {
  const modelRef = useRef();
  const { scene } = useGLTF("/models-3d/fattyLiver.glb");

  // Animación de rotación
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.3;
    }
  });

  //  Activar sombras en todas las mallas del modelo
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = false;
      }
    });
  }, [scene]);

  // Render del modelo
  return <primitive ref={modelRef} object={scene} position={[0, 1, 0]} />;
};

export default FattyLiver;
