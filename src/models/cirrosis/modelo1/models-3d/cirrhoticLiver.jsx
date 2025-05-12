import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export default function CirrhoticLiver(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/models-cirrosis/cirrhoticLiver.glb"
  );
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cirrhoticLiver.geometry}
        material={materials.SeccionMayor}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cirrhoticLiver_1.geometry}
        material={materials.SeccionMedia}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cirrhoticLiver_2.geometry}
        material={materials.SeccionFinal}
      />
    </group>
  );
}

useGLTF.preload("/models-3d/models-cirrosis/cirrhoticLiver.glb");
