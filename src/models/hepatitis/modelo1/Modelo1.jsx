import { Canvas } from "@react-three/fiber";
import Hepatitis from "./models-3d/hepatitis";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./lights/lights";

const Modelo1 = () => {
  return (
    <Canvas camera={{ position: [0, 1, 2] }} shadows={true}>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <Lights />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <Hepatitis />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[5, 5]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </Canvas>
  );
};

export default Modelo1;