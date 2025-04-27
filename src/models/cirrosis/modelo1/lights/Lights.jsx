import { Environment } from '@react-three/drei'

const Lights = () => {

  return (
    <>
      <Environment preset="city" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />     

      <mesh
        receiveShadow
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -1.5, 0]}
      >
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.2} />
      </mesh>
    </>
  );
};

export default Lights;