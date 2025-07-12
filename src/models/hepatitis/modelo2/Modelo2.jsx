import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  KeyboardControls,
} from "@react-three/drei";
import { useMemo, useRef } from "react";
import Ojoicter from "../modelo2/models3d/Ojoicter"; // ← Corrección aquí
import Lights from "../modelo2/lights/Lights";
import Controls from "../modelo2/controls/controls";
import Title from "../modelo2/texts/Title";
import TitleAd from "../modelo2/texts/TitleAd";
import Recipient from "../modelo2/models3d/Recipient";
import Staging from "../modelo2/staging/staging";

const Modelo2 = () => {
  const actionRef = useRef(null);

  const map = useMemo(() => [{ name: "Throb", keys: ["KeyP"] }], []);

  const handlePain = () => {
    if (actionRef.current) {
      actionRef.current("Throb");
      setTimeout(() => {}, 2000);
    }
  };

  return (
    <KeyboardControls map={map}>
      <Canvas shadows style={{ width: "550px", height: "690px" }}>
        {/* Cámara */}
        <PerspectiveCamera makeDefault position={[1, 0, 3.5]} fov={75} />

        {/* Luces y entorno */}
        <Lights />
        <Staging />

        {/* Controles */}
        <Controls />
        <OrbitControls enableZoom enablePan enableRotate />

        {/* Modelo principal */}
        <Ojoicter
          scale={[3, 3, 3]}
          position={[1, -3, 1]}
          actionRef={actionRef}
        />

        {/* Plano para recibir sombra */}
        <mesh
          receiveShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -1, 0]}
        >
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.8} />
        </mesh>

        {/* Elementos adicionales */}
        <Recipient />

        {/* Títulos */}
        <Title
          title="¡Haz Click!"
          onClick={handlePain}
          position={[0, 2, 0]}
        />
        <TitleAd
          title="💡 Tecla 'T' para animar el modelo"
          position={[0, -1, 0]}
        />
      </Canvas>
    </KeyboardControls>
  );
};

export default Modelo2;
