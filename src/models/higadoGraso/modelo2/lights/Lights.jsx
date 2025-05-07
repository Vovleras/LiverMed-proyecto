const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <hemisphereLight
        skyColor="#ffffff"
        groundColor="#000000"
        intensity={1.5}
      />
      <directionalLight
        position={[5, 10, 5]} 
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        shadow-camera-right={10}
      />
    </>
  );
};

export default Lights;
