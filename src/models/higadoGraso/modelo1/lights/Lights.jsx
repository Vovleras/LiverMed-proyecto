import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper } from "three";

const Lights = () => {
  const directionalLightRef = useRef();
  //useHelper(directionalLightRef, DirectionalLightHelper);

  return (
    <>
      <ambientLight intensity={2} />
      <directionalLight
        ref={directionalLightRef}
        castShadow
        position={[5, 15, 10]}
        intensity={18}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-radius={2}
      />
    </>
  );
};

export default Lights;
