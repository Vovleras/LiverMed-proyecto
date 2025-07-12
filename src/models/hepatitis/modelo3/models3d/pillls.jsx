import React, { useEffect } from "react";
import { useGLTF } from "@react-three/drei";

/**
 * Componente que carga y muestra el modelo 3D pillls.glb
 * desde la carpeta public/models-3d/models-hepatitis/
 */
export function Pillls(props) {
  const gltf = useGLTF("/models-3d/models-hepatitis/pillls.glb");

  useEffect(() => {
    if (gltf?.scene) {
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.scale.set(0.15, 0.15, 0.15);
        }
      });
    }
  }, [gltf]);

  if (!gltf || !gltf.scene) return null;

  return (
    <primitive
      object={gltf.scene}
      position={[0, -1.5, 0]}
      rotation={[0, Math.PI, 0]}
      {...props}
    />
  );
}

useGLTF.preload("/models-3d/models-hepatitis/pillls.glb");



