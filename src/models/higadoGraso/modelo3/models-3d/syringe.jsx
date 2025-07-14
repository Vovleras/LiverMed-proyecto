import { useEffect, useRef, useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const Syringe = ({ scale = [1, 1, 1], position = [0, 0, 0], animate }) => {
  const { scene } = useGLTF("/models-3d/models-higadoGraso/syringe.glb");
  const modelRef = useRef();
  const originalColors = useRef([]);

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.material.metalness = 1;
          child.material.roughness = 0.1;

          // Guardar color original una vez
          originalColors.current.push({
            mesh: child,
            color: child.material.color.clone(),
          });
        }
      });
    }
  }, [scene]);

  // Cambiar color al hacer hover
  const handlePointerOver = () => {
    originalColors.current.forEach(({ mesh }) => {
      mesh.material.color.set("orange");
    });
    setHovered(true);
  };

  const handlePointerOut = () => {
    originalColors.current.forEach(({ mesh, color }) => {
      mesh.material.color.copy(color);
    });
    setHovered(false);
  };

  useEffect(() => {
    if (modelRef.current) {
      modelRef.current.lookAt(new THREE.Vector3(-10, 4, 2));
    }
  }, []);

  useFrame(() => {
    if (animate && modelRef.current) {
      const t = Date.now() * 0.005;
      modelRef.current.position.z = Math.sin(t) * 0.3 + position[2];
    } else if (modelRef.current) {
      modelRef.current.position.z = position[2];
    }
  });

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

export default Syringe;
