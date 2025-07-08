import React from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Pills } from "./pills";

const PillsAnimation = (props) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.4;
    }
  });
  return (
    <group ref={ref} {...props}>
      <Pills scale={[23, 23, 23]} position={[0, -0.7, 0]} />
    </group>
  );
};

export default PillsAnimation;
