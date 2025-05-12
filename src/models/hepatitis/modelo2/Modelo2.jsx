import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Ojoicter from './models3d/Ojoicter'; // ✅ default import
import Lights from './lights/Lights';
import Staging from './staging/Staging';
import Controls from './controls/Controls';

const Modelo2 = () => {
  return (
    <Canvas shadows>
      {/* Cámara */}
      <PerspectiveCamera makeDefault position={[1, 0, 3.5]} />

      {/* Luces */}
      <Lights />

      {/* Controles */}
      <OrbitControls enableZoom enablePan enableRotate />

      {/* Modelo 3D */}
      <Ojoicter scale={18} position={[1 -0.3, 0]} />

      {/* Plano para sombras */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[20, 20]} />
        <shadowMaterial opacity={0.8} />
      </mesh>
    </Canvas>
  );
};

export default Modelo2;

