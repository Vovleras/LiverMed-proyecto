import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Html,
  Stars,
  PositionalAudio,
} from "@react-three/drei";
import { useRef } from "react";
import Salad from "./models-3d/salad";
import Lights from "./lights/Lights";
import Controls from "./controls/Controls";
import Title3D from "./text/Title3D";

const Modelo4 = () => {
  const audioRef = useRef();

  const handlePlaySound = () => {
    if (audioRef.current && audioRef.current.play) {
      audioRef.current.play();
    }
  };

  // Botón HTML 3D 
  const BotonHTML3D = () => (
    <Html position={[0, -1.0, 0]} center>
      <button
        onClick={handlePlaySound}
        style={{
          backgroundColor: "#3a3a3a",
          color: "#ffffff",
          padding: "10px 20px",
          fontWeight: "bold",
          borderRadius: "12px",
          border: "none",
          fontSize: "14px",
          boxShadow: "0px 4px 8px rgba(0,0,0,0.3)",
          cursor: "pointer",
          whiteSpace: "nowrap",
          minWidth: "120px",
          textAlign: "center",
        }}
      >
        Haz clic aquí
      </button>
    </Html>
  );

  //  Sonido 3D 
  const Sonido3D = () => (
    <mesh position={[0, 0.4, 0]} visible={false}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial transparent opacity={0} />
      <PositionalAudio
        ref={audioRef}
        url="/sounds/higadoGraso/salad-sound.mp3"
        distance={5}
        loop={false}
        autoplay={false}
      />
    </mesh>
  );

  return (
    <div style={{ position: "relative", width: "500px", height: "550px" }}>
      {/* Texto 2D */}
      <div
        style={{
          position: "absolute",
          bottom: 80,
          left: "50%",
          transform: "translateX(-50%)",
          background: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "6px 12px",
          borderRadius: "8px",
          fontSize: "14px",
          zIndex: 1,
        }}
      >
        Presiona la tecla "E" para detener/reanudar la animación
      </div>

      {/* Canvas 3D */}
      <Canvas
        shadows
        camera={{ position: [0, 1.8, 4], fov: 30 }}
        style={{ width: "100%", height: "100%" }}
      >
        <PerspectiveCamera makeDefault position={[0.5, 2, 5]} fov={45} />
        <Stars radius={100} depth={50} count={50000} factor={4} fade />
        <Lights />
        <Controls />

        {/* Modelo */}
        <Salad scale={[2.5, 2.5, 2.5]} position={[0, 1, 0]} />

        {/* Botón HTML 3D */}
        <BotonHTML3D />

        {/* Sonido 3D en escena */}
        <Sonido3D />

        {/* Texto 3D */}
        <Title3D title="Ensalada" position={[0, 2, 0]} />

        {/* Sombra */}
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

export default Modelo4;
