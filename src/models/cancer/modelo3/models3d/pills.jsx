import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Pills(props) {
  const { nodes, materials } = useGLTF("/models-3d/models-cancer/pills.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PillsBottom.geometry}
        material={materials.PillsBottom}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PillsTop.geometry}
        material={materials.PillsTop}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PillsContent1.geometry}
        material={materials.PillsContent}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.PillsContent2.geometry}
        material={materials.PillsContent}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/models-cancer/pills.glb");
