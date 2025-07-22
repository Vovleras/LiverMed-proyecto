import React from "react";
import { RigidBody } from "@react-three/rapier";

const Floor = () => {
  return (
    <RigidBody type="fixed" colliders="cuboid" restitution={0.3} friction={1}>
      <mesh receiveShadow position={[0, -0.1, 4]}>
        <boxGeometry args={[3, 0.1, 3]} />
        <meshStandardMaterial color="pink" />
      </mesh>
    </RigidBody>
  );
};

export default Floor;
