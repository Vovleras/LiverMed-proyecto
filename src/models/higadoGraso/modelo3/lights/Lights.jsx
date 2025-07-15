const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.1} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
        shadow-camera-left={-15}
        shadow-camera-right={15}
      />
    </>
  );
};

export default Lights;
