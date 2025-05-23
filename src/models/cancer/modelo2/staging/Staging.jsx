import { Cloud, Environment, Sparkles, Stars } from "@react-three/drei";

const Staging = () => {
  return (
    <>
      <Sparkles
        count={2}
        size={7}
        speed={0.9}
        color="beige"
        noise={10}
        opacity={2}
        position={[0, 2.89, 0]}
      />

      <Stars />

      <Cloud
        position={[0, 2.7, 0]}
        scale={[0.18, 0.18, 0.18]}
        opacity={0.7}
        volume={3.5}
      />

      <Environment preset="sunset" />
    </>
  );
};

export default Staging;
