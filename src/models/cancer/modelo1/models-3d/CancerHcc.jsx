import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function Cancer(props) {
  const { nodes, materials } = useGLTF("/models-3d/hcc.glb");

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LiverLeft.geometry}
        material={materials.LiverLeftMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LiverCenter.geometry}
        material={materials.LiverCenterMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.LiverRight.geometry}
        material={materials.LiverRightMaterial}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/hcc.glb");
