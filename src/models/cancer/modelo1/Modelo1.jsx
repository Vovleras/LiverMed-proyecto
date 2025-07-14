import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, KeyboardControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import Lights from "./lights/Lights";
import Recipient from "./models-3d/Recipient";
import Controls from "./controls/Controls";
import AnimateModel from "./models-3d/AnimateModel";
import KeyboardController from "./controls/KeyBoardController";
import { useCallback } from "react";

const Modelo1 = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  const clickAnimation = useCallback(() => {
    setIsAnimating((prev) => !prev);
  }, []);

  const map = useMemo(
    () => [
      {
        name: "animation",
        keys: ["KeyS"],
      },
    ],
    []
  );

  return (
    <KeyboardControls map={map}>
      <Canvas shadows={true}>
        <PerspectiveCamera makeDefault position={[1, 2, 5]} />
        <Lights />
        <AnimateModel isAnimating={isAnimating} onClick={clickAnimation} />
        <Controls />
        <Recipient />
        <KeyboardController setIsAnimating={setIsAnimating} />
      </Canvas>

      <div
        style={{
          position: "absolute",
          bottom: "10px",
          right: "10px",
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          color: "white",
          padding: "0.4rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.9rem",
          zIndex: 10,
        }}
      >
        💡 Tecla 'S' o 👆🏻 click sobre el modelo <br />
        para {isAnimating ? "detenerlo" : "reanudarlo"}
      </div>
    </KeyboardControls>
  );
};

export default Modelo1;
