import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Html } from "@react-three/drei";
import { Fog } from "three";
import SickBody from "./models-3d/sickBody";
import Lights from "./lights/Lights";
import Controls from "./controls/Controls";

const Modelo2 = () => {
  return (
    <div>
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4], fov: 30 }}
        style={{ width: "500px", height: "550px" }}
        onCreated={({ scene }) => {
          scene.fog = new Fog("#dfe6e9", 10, 25);
        }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />

        <Lights />
        <Controls />

        <SickBody scale={[2.5, 2.5, 2.5]} position={[0, 1, 0]} />

        <Html position={[0, 4.8, 0]} center>
          <h1
            style={{
              color: "black",
              fontSize: "15px",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            Tecla 'A' para animar el modelo
          </h1>
        </Html>

        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -3.5, 0]} 
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Modelo2;
