import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Vaccine(props) {
  const { nodes, materials } = useGLTF("/models-3d/models-cancer/vaccine.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Syringe.geometry}
        material={materials.SyringeMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Neddle.geometry}
        material={materials.NeedleMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.NeddleBottom.geometry}
        material={materials.NeedleBottomMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Piston.geometry}
        material={materials.PistonMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Vial.geometry}
        material={materials.VialMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.VialTop.geometry}
        material={materials.VialTopMaterial}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.VialOuter.geometry}
        material={materials.VialOuterMaterial}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/models-cancer/vaccine.glb");
