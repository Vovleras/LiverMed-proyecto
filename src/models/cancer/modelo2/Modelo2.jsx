import { OrbitControls } from "@react-three/drei";
import { Ictericia } from "./models3d/Ictericia";
import { Canvas } from "@react-three/fiber";
import Lights from "./lights/Lights";
import { PerspectiveCamera } from "@react-three/drei";

const Modelo2 = () => {
  return (
    // <Canvas shadows={true}>
    //   <Lights />
    //   <PerspectiveCamera makeDefault position={[0, 1, 7]} />
    //   <Ictericia position={[0, -7, 0]} scale={[7, 7, 7]} />
    //   <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
    // </Canvas>

    <div>
      <img src="/imagenes/body.png" alt="Síntomas ilustración" />
    </div>
  );
};

export default Modelo2;
