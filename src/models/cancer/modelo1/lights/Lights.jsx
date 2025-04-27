const Lights = () => {
  return (
    <>
      <directionalLight position={[10, 10, 5]} intensity={10} />
      <directionalLight position={[10, 10, -5]} intensity={8} />
      <directionalLight position={[10, -10, -5]} intensity={10} />
      <directionalLight position={[-10, -10, -5]} intensity={8} />
      <directionalLight
        position={[-10, 10, 5]}
        intensity={15}
        castShadow={true}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
        shadow-camera-near={1}
        shadow-camera-far={50}
      />
    </>
  );
};

export default Lights;
