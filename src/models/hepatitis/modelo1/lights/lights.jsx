import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLightHelper, HemisphereLight, PointLight, SpotLight} from "three";

const Lights = () => {
    const directionalLightRef = useRef();
    useHelper(directionalLightRef, DirectionalLightHelper);
    return (
      <>
        <HemisphereLight
          ref={hemisphereLightRef}
          color={"red"}
          groundColor={"blue"}
          intensity={2}
          />

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

        <ambientLight color={"#F5F5DC"} intensity={2} />
        <directionalLightRef
          ref={directionalLightRef}
          color={"yellow"}
          position={[0, 5, 5]}
          intensity={2}
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