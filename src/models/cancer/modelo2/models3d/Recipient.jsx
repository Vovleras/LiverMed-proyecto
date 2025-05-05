const Recipient = () => {
  return (
    <mesh
      receiveShadow={true}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -3.7, 0]}
    >
      <planeGeometry args={[100, 100]} />
      <shadowMaterial opacity={0.4} />
    </mesh>
  );
};

export default Recipient;
