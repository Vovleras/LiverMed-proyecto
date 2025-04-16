//import { useHelper } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { 
  //useEffect,
  useRef } from "react";
//import { CameraHelper, SpotLightHelper } from "three";

const Lights = () => {
  const spotLightRef = useRef();
  //useHelper(spotLightRef, SpotLightHelper);

  useFrame(({ clock }) => {
    if (!spotLightRef.current) return;
    const elapsedTime = clock.getElapsedTime();
    spotLightRef.current.target.position.x = Math.cos(elapsedTime);
    spotLightRef.current.target.position.z = Math.sin(elapsedTime);
    spotLightRef.current.target.updateMatrixWorld(); 
  });

  // useEffect(()=>{
  //   const shadowCamera = spotLightRef.current.shadow.camera;
  //   const cameraHelper = new CameraHelper(shadowCamera);
  //   spotLightRef.current.parent.add(cameraHelper);

  //   return () => {
  //     spotLightRef.current.parent.remove(cameraHelper);
  //     cameraHelper.dispose();
  //   };
  // }, [spotLightRef])

  return (
    <>
      <ambientLight intensity={1.5} />
      <spotLight
        ref={spotLightRef}
        position={[0, 3, 0]}
        distance={6}
        intensity={15}
        angle={Math.PI / 6}
        penumbra={0.1}
        castShadow
        shadow-mapSize={[128, 128]}
        shadow-camera-near={1}
        shadow-camera-far={2}
        shadow-normalBias={0.05}
      />
    </>
  );
};

export default Lights;