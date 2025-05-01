import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import Cancer from "./models-3d/Cancer.jsx";
import Lights from "./lights/Lights";
import Recipient from "./models-3d/Recipient";
import { OrbitControls } from "@react-three/drei";

const AnimateModel = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Cancer position={[0, 0.3, 0]} scale={[4, 4, 4]} />
    </group>
  );
};

const Modelo1 = () => {
  return (
    <Canvas shadows={true}>
      <PerspectiveCamera makeDefault position={[1, 2, 5]} />
      <Lights />
      <AnimateModel />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

      <Recipient />
    </Canvas>
  );
};

export default Modelo1;
