import { Canvas } from "@react-three/fiber";
import {
  KeyboardControls,
  PerspectiveCamera,
  OrbitControls,
} from "@react-three/drei";
import { useMemo, useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Lights from "./lights/Lights";
import Controls from "./controls/Controls";
import { Prevencion } from "./models3d/Prevencion";
import Recipient from "./models3d/Recipient";
import Title3D from "./text/Title3D";
import Title2D from "./text/Title2D";
import TitleAd from "./text/TitleAd";

// Animación suave del modelo Prevención
const PrevencionAnimation = (props) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.x = Math.sin(t / 2) * 1 + 0.1;
  });

  return (
    <group ref={ref} {...props}>
      <Prevencion scale={[14, 14, 14]} position={[0, 0.5, 0]} />
    </group>
  );
};

const Modelo4 = () => {
  const map = useMemo(() => [{ name: "Prevencion", keys: ["KeyP"] }], []);

  const handleClick = () => {
    window.open(
      "https://saludtotal.com.co/wp-content/uploads/2025/01/ESQUEMA-DE-VACUNACION.pdf",
      "_blank"
    );
  };

  // Corrige la tecla presionada: era "Key", debe ser "KeyP"
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyP") {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas shadows style={{ width: "550px", height: "700px" }}>
          <PerspectiveCamera makeDefault position={[0, 0, 6]} />
          <Controls />
          <OrbitControls />
          <Lights receiveShadow />
          <Recipient />
          <PrevencionAnimation receiveShadow />
         <Title3D title={"¡Debes vacunarte!"} position={[1, 3, 2]} />
         <Title2D title={"Prevención Hepatitis"} position={[0, 2, 0]} />
          <TitleAd
            title={<>👆 Esquema Vacunación Colombia</>}
            position={[0, -1.2, 0]}
            onClick={handleClick}
          />
        </Canvas>
      </KeyboardControls>

      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "0.2rem 0.5rem",
          borderRadius: "0.5rem",
          fontSize: "0.8rem",
          zIndex: 10,
        }}
      >
        💡 Presiona la tecla 'P' para abrir el esquema de vacunación
      </div>
    </>
  );
};

export default Modelo4;
