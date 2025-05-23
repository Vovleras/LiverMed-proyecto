import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  KeyboardControls,
  useKeyboardControls,
} from "@react-three/drei";
import { useRef, useMemo, useState, useEffect } from "react";
import Cancer from "./models-3d/CancerHcc";
import Lights from "./lights/Lights";
import Recipient from "./models-3d/Recipient";
import Controls from "./controls/Controls";

const AnimateModel = ({ isAnimating }) => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current && isAnimating) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <Cancer position={[0, 0.3, 0]} scale={[4, 4, 4]} />
    </group>
  );
};

const KeyboardController = ({ setIsAnimating }) => {
  const pressed = useKeyboardControls((state) => state.animation);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyS") {
        setIsAnimating((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsAnimating]);

  return null;
};

const Modelo1 = () => {
  const [isAnimating, setIsAnimating] = useState(true);

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
        <AnimateModel isAnimating={isAnimating} />
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
        💡 Tecla 'S' para {isAnimating ? "detener" : "reanudar"} el modelo
      </div>
    </KeyboardControls>
  );
};

export default Modelo1;
