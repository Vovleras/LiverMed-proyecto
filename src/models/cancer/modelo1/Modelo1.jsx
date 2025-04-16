import { Canvas } from "@react-three/fiber";
import Cancer from './models-3d/cancer'
import {
  OrbitControls,
  PerspectiveCamera,
  Environment,
} from "@react-three/drei";

const Modelo1 = () => {
  return (
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Cancer />
      </Canvas>
  )
}
export default Modelo1;