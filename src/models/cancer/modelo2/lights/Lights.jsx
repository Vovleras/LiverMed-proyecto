const Lights = () => {
  return (
    <>
      <spotLight
        position={[0, 10, 10]}
        distance={25}
        intensity={15}
        penumbra={0.5}
        angle={Math.PI / 9}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00001}
      />

      <ambientLight color={"white"} intensity={3} />
    </>
  );
};
export default Lights;
