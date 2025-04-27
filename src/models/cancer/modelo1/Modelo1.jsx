import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useRef } from "react";
import Cancer from "./models-3d/cancer";
import Lights from "./lights/Lights";

const AnimateModel = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3;
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
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <Lights />
      <AnimateModel />
      <mesh
        receiveShadow={true}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
      >
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </Canvas>
  );
};

export default Modelo1;
