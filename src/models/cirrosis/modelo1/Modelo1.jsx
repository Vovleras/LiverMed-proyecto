import { Canvas } from "@react-three/fiber";
import CirrhoticLiver from './models-3d/cirrhoticLiver'
import Lights from './lights/Lights'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";

const Modelo1 = () => {
  return (
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <CirrhoticLiver />
      </Canvas>
  )
}
export default Modelo1;