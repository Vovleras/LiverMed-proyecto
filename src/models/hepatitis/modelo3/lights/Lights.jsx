import { useHelper } from "@react-three/drei";
import { useRef } from "react";

const Lights = () => {
  return (
    <>
      <ambientLight intensity={1.5} />
      <directionalLight
        position={[15, 15, 15]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <hemisphereLight color={"white"} intensity={2} />
    </>
  );
};

export default Lights;
