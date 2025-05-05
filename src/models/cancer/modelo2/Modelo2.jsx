import { Ictericia } from "./models3d/Ictericia";
import { Canvas } from "@react-three/fiber";
import Lights from "./lights/Lights";
import {
  BakeShadows,
  KeyboardControls,
  PerspectiveCamera,
} from "@react-three/drei";
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
    }
  };
  return (
    <>
      <KeyboardControls map={map}>
        <Canvas shadows={true} style={{ width: "550px", height: "780px" }}>
          <BakeShadows />
          <Controls />
          <Lights />
          <Staging />
          <PerspectiveCamera makeDefault position={[0, 2.2, 7]} />
          <Ictericia
            position={[0, -3.6, 0]}
            scale={[3.2, 3.2, 3.2]}
            actionRef={actionRef}
          />
          <Recipient />
          <Title title={"¡Tocar!"} onClick={handlePain} />
        </Canvas>
      </KeyboardControls>
    </>
  );
};

export default Modelo2;
