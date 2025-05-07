import { OrbitControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls
      enablePan={false}
      minDistance={15}
      maxDistance={20}
      autoRotate={false}
    />
  );
};

export default Controls;
