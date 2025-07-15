export default function Piso() {
  return (
    <mesh 
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      receiveShadow
    >
      <circleGeometry args={[15, 32]} />
      <meshStandardMaterial color="#dadad5" />
    </mesh>
  );
};