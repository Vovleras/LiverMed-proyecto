import { useRef } from "react";
import { useHelper } from "@react-three/drei";
import { DirectionalLightHelper, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
const Lights = () => {
  const mainLightRef = useRef();

  //useHelper(mainLightRef, DirectionalLightHelper);
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();
    if (mainLightRef.current) {
      mainLightRef.current.position.x = MathUtils.lerp(
        -10,
        1,
        Math.sin(elapsedTime)
      );
      mainLightRef.current.position.z = MathUtils.lerp(
        8,
        1,
        Math.cos(elapsedTime)
      );
    }
  });

  return (
    <>
      <directionalLight position={[10, 10, 5]} intensity={10} />

      {/* Luces secundarias sin sombras */}
      <directionalLight position={[10, 10, -5]} intensity={8} />
      <directionalLight position={[10, -10, -5]} intensity={10} />
      <directionalLight position={[-10, -10, -5]} intensity={8} />
      <directionalLight
        position={[-10, 10, 5]}
        intensity={15}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={50}
        ref={mainLightRef}
      />
    </>
  );
};

<<<<<<< Updated upstream
export default Lights;
=======
export default Lights;
>>>>>>> Stashed changes
