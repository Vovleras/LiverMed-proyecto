import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Cancer from "./CancerHcc";

const AnimateModel = ({ isAnimating }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Cancer position={[0, 0.3, 0]} scale={[4, 4, 4]} />
    </group>
  );
};

export default AnimateModel;
