import { Ictericia } from "./models3d/Ictericia";
import { Canvas } from "@react-three/fiber";
import Lights from "./lights/Lights";
import { KeyboardControls, PerspectiveCamera } from "@react-three/drei";
import Controls from "./controls/Controls";
import { useMemo } from "react";
import Recipient from "./models3d/Recipient";
import Staging from "./staging/Staging";
import Title from "./texts/Title";
import { useRef } from "react";

import "./Modelo2.css";

const Modelo2 = () => {
  const map = useMemo(() => [{ name: "Pain", keys: ["KeyP"] }], []);
  const actionRef = useRef(null);

  const handlePain = () => {
    if (actionRef.current) {
      actionRef.current("Pain");
      setTimeout(() => {}, 2000);
    }
  };

  return (
    <>
      <KeyboardControls map={map}>
        <Canvas shadows={true} style={{ width: "550px", height: "780px" }}>
          <Controls />

          <Recipient />
          <Lights />
          <Staging />
          <PerspectiveCamera makeDefault position={[0, 2.2, 7]} />
          <Ictericia
            position={[0, -3.6, 0]}
            scale={[3.2, 3.2, 3.2]}
            actionRef={actionRef}
          />

          <Title title={"¡Haz Click!"} onClick={handlePain} />
        </Canvas>
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            color: "white",
            padding: "0.2rem 0.2rem",
            borderRadius: "0.5rem",
            fontSize: "0.8rem",
            zIndex: 10,
          }}
        >
          💡 Tecla 'P' para animar el modelo
        </div>
      </KeyboardControls>
    </>
  );
};

export default Modelo2;
