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
import TitleAd from "./texts/TitleAd";

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
        <Canvas shadows={true} style={{ width: "550px", height: "690px" }}>
          <Controls />
          <Recipient />
          <Lights />
          <Staging />
          <PerspectiveCamera makeDefault position={[0, 2.2, 7]} />
          <Ictericia
            position={[0, -3.4, 0]}
            scale={[3.2, 3.2, 3.2]}
            actionRef={actionRef}
          />
          <Title
            title="¡Haz Click!"
            onClick={handlePain}
            position={[0.2, 2.7, 0]}
            className="title"
          />
          <TitleAd
            title="💡 Tecla 'P' para animar el modelo"
            position={[1.27, -2.98, 1]}
          />
        </Canvas>
      </KeyboardControls>
    </>
  );
};

export default Modelo2;
