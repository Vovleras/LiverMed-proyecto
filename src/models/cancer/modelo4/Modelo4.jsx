import { Canvas } from "@react-three/fiber";
import { KeyboardControls, PerspectiveCamera } from "@react-three/drei";
import { useMemo } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Lights from "./lights/Lights";
import Controls from "./controls/Controls";
import { Vaccine } from "./models3d/Vaccine";
import Recipient from "./models3d/Recipient";
import Title3D from "./text/Title3D";
import Title2D from "./text/Title2D";
import TitleAd from "./text/TitleAd";

const VaccineAnimation = (props) => {
  const ref = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    ref.current.position.x = Math.sin(t / 2) * 1 + 0.1;
  });
  return (
    <group ref={ref} {...props}>
      <Vaccine scale={[17, 17, 17]} position={[0, -2.06, 0]} />
    </group>
  );
};

const Modelo4 = () => {
  const map = useMemo(() => [{ name: "Vaccine", keys: ["KeyV"] }], []);
  const handleClick = () => {
    window.open(
      "https://saludtotal.com.co/wp-content/uploads/2025/01/ESQUEMA-DE-VACUNACION.pdf",
      "_blank"
    );
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyV") {
        handleClick();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <>
      <KeyboardControls map={map}>
        <Canvas shadows={true} style={{ width: "550px", height: "700px" }}>
          <PerspectiveCamera makeDefault position={[0, 0, 7]} />
          <Controls />
          <Lights />
          <Recipient />
          <VaccineAnimation />
          <Title3D title={"¡Vacunate!"} />
          <Title2D title={"Previene"} />
          <TitleAd
            title={<>👆 Esquema Vacunación Colombia</>}
            position={[0.54, -2.4, 1]}
            onClick={handleClick}
          />
        </Canvas>
      </KeyboardControls>
      <div
        style={{
          position: "absolute",
          bottom: "20px",

          left: "-550px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "0.2rem 0.2rem",
          borderRadius: "0.5rem",
          fontSize: "0.8rem",
          zIndex: 10,
        }}
      >
        💡 Tecla 'V' para descargar esquema de vacunación
      </div>
    </>
  );
};

export default Modelo4;
