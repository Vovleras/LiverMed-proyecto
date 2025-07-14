import { SoftShadows } from "@react-three/drei";

const Recipient = () => {
  return (
    <mesh receiveShadow rotation={[-Math.PI / 3, 0, 0]} position={[0, -4, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial />
      <shadowMaterial opacity={0.1} />
    </mesh>
  );
};

export default Recipient;
