import { OrbitControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls
      enablePan={true}
      minDistance={6}
      maxDistance={8}
  
    />
  );
};

export default Controls;
