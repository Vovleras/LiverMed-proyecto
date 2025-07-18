import React, { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";

/**
 * Componente que carga y muestra el modelo 3D prevencion.glb
 * desde la carpeta public/models-3d/models-hepatitis/
 * con la misma escala y configuración que pills.
 */
export function Prevencion(props) {
  const { scene } = useGLTF("/models-3d/models-hepatitis/prevencion.glb");
  const sceneRef = useRef(null);

  useEffect(() => {
    if (scene && !sceneRef.current) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.scale.set(0.15, 0.15, 0.15); // escala tipo pills
        }
      });
      sceneRef.current = scene;
    }
  }, [scene]);

  if (!scene) return null;

  return (
    <primitive
      object={scene}
      position={[0, -1.8, 0]}
      rotation={[0, 5, 0]}
      {...props}
    />
  );
}

useGLTF.preload("/models-3d/models-hepatitis/prevencion.glb");


