import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ShadowMaterial } from "three";
import Cancer from "./models-3d/cancer";
import Lights from "./lights/Lights";

extend({ ShadowMaterial });

const Modelo1 = () => {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[1, 2, 5]} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <Lights />
      <Cancer position={[0, 0.3, 0]} scale={[4, 4, 4]} />
      <mesh
        receiveShadow
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
