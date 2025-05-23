import { Canvas } from "@react-three/fiber";
import FattyLiver from "./models-3d/fattyLiver";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import Lights from "./lights/Lights";
import Controls from "./controls/Controls";
const Modelo1 = () => {
  return (
    <Canvas camera={{ position: [0, 0.8, 4] }} shadows={true}>
      <PerspectiveCamera makeDefault position={[0, 1, 4]} />
      <Lights />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
      <FattyLiver />
      <Controls />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[5, 5]} />
        <shadowMaterial opacity={0.3} />
      </mesh>
    </Canvas>
  );
};

export default Modelo1;
