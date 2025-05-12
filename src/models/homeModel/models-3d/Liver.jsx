import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function Liver(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/home-model/liver.glb"
  );
  return (
    <group {...props} dispose={null}>
      <group position={[0.081, 0.009, -0.358]} rotation={[-Math.PI / 2, 0, 0.264]}>
        <group rotation={[Math.PI / 2, 0, 0]}>
          <group position={[-0.22, -0.017, 0.33]} scale={[0.24, 0.27, 0.181]}>
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0.geometry}
              material={materials.material}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0_1.geometry}
              material={materials.material_1}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0_2.geometry}
              material={materials.material_6}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0_3.geometry}
              material={materials.material_2}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0_4.geometry}
              material={materials.material_3}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0_5.geometry}
              material={materials.material_4}
            />
            <mesh
              castShadow
              receiveShadow
              geometry={nodes.Object_0_6.geometry}
              material={materials.material_5}
            />
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/home-model/liver.glb");
