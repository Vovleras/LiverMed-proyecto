import { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Html,
  Environment,
  Text,
  Sky,
} from "@react-three/drei";
import Syringe from "./models-3d/syringe";
import Lights from "./lights/Lights";
import Controls from "./controls/Controls";

const Modelo3 = () => {
  const [animate, setAnimate] = useState(false);

  //  tecla 'i' para alternar animación
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === "i") {
        setAnimate((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div>
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4], fov: 30 }}
        style={{ width: "500px", height: "550px" }}
      >
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={45} />
        <Lights />
        <Environment preset="city" background={false} />
        <Sky sunPosition={[100, 20, 100]} />
        <Controls />

        <Syringe
          scale={[20, 20, 20]}
          position={[-1, -2, 0]}
          rotation={[Math.PI / 8, Math.PI / 10, 0]}
          animate={animate}
        />

        <Html position={[0, -3, 0]} center>
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "15px", margin: 0 }}>
              Presiona 'I' para inyectar.
            </h1>
            <button
              style={{
                marginTop: "5px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onClick={() => setAnimate((prev) => !prev)}
            >
              ¡Haz clic!
            </button>
          </div>
        </Html>

        <Text position={[0, 3, -2]} fontSize={0.5} color="black">
          Jeringa
        </Text>

        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -3.5, 0]}
        >
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.5} />
        </mesh>
      </Canvas>
    </div>
  );
};

export default Modelo3;
