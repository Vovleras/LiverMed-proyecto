import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ShadowMaterial } from "three";
import Cancer from "./models-3d/cancer";
import Lights from "./lights/Lights";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

// Habilitamos usar <shadowMaterial /> en JSX
extend({ ShadowMaterial });

const Modelo1 = () => {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[1, 2, 5]} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

      <Lights />
      {/* Modelo 3D */}

      <Cancer position={[0, 1.3, 0]} scale={[4, 4, 4]} />

      {/* Plano invisible que solo muestra la sombra */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </Canvas>
  );
};

export default Modelo1;
