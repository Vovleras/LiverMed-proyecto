import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { ShadowMaterial } from "three";
import Hepatitis from "./models-3d/hepatitis";
import Lights from ".../lights/lights";
import { useFrame} from "@react-three/fiber";
import { useRef } from "react";

/* Se habilita ShadowMaterial*/
extend({ ShadowMaterial });

const Modelo1 = () => {
  return (
    <Canvas shadows>
      <PerspectiveCamera makeDefault position={[0, 3, 6]} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />

      <Lights />
      { }
      
      <Hepatitis position={[0, 1.5, 0]} scale={[5, 5, 5]} />


      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <shadowMaterial opacity={0.4} />
      </mesh>
    </Canvas>
  );
};

export default Modelo1;