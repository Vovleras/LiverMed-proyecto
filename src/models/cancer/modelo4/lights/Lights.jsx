const Lights = () => {
  return (
    <>
      <pointLight color={"white"} position={[0, 4, -4]} intensity={15} />
      <ambientLight intensity={7.5} />
      <directionalLight
        position={[0, 50, 100]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        intensity={2}
        castShadow
      />
    </>
  );
};

export default Lights;
