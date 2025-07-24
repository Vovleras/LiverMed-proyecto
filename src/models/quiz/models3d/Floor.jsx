import React from "react";
import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  return (
    <RigidBody type="fixed" colliders="cuboid" restitution={0.3} friction={1}>
      <mesh receiveShadow position={[0, -0.1, 3.2]}>
        <boxGeometry args={[2, 0.1, 2]} />
        <meshStandardMaterial color="#404a6e" />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
