import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from '@react-three/fiber'

export default function Medicinas(props) {
  const { nodes, materials } = useGLTF(
    "/models-3d/models-cirrosis/Medicinas.glb"
  );
  const groupRef = useRef()
  const time = useRef(0)
  
  useFrame((state, delta) => {
    time.current += delta * 0.8
    const breathMovement = (Math.sin(time.current * 1.2) + 1) * 0.025    
    if (groupRef.current) {
      groupRef.current.position.y = breathMovement
      const scaleFactor = 1 + (Math.sin(time.current * 1.2) + 1) * 0.0025
      groupRef.current.scale.set(scaleFactor, scaleFactor, scaleFactor)
    }
  })

  return (
    <group {...props} dispose={null} ref={groupRef}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.841}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BottleLowPol_Bottle_0_1.geometry}
          material={materials.Bottle}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BottleLowPol_Bottle_0_2.geometry}
          material={materials.Cover}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BottleLowPol_Bottle_0_3.geometry}
          material={materials.Poster}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BottleLowPol_Bottle_0_4.geometry}
          material={materials.Support_Cover}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.BottleLowPol_Bottle_0_5.geometry}
          material={materials['Material.001']}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/models-cirrosis/Medicinas.glb");