import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper, MathUtils } from "three";
import { useFrame } from "@react-three/fiber";
const Lights = () => {
  const directionalLightRef = useRef();

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
        {/*<SpotLight
          ref={spotLightRef}
          color={"red"}
          position={[4, 2, -2]}
          distance={6}
          intensity={100}
          angle={Math.PI / 14}
          penumbra={1}
        />
        
        <pointLight
          ref={directionalLightRef}
          color={"cyan"}
          position={[0, 2, -4]}
          intensity={5}
        />*/}

      <directionalLight position={[0, 5, -5]} intensity={8} />
      <directionalLight position={[0, -5, 5]} intensity={10} />
      <directionalLight position={[0, -5, -5]} intensity={8} />
      <directionalLight
          position={[0, 5, 5]}
          intensity={10}
          castShadow={true}
          shadow-mapSize={[2048, 2048]}
          shadow-camera-left={-1}
          shadow-camera-right={1}
          shadow-camera-top={1}
          shadow-camera-bottom={-1}
          shadow-camera-near={1}
          shadow-camera-far={7}
        />
      </>
    );
};

export default Lights;