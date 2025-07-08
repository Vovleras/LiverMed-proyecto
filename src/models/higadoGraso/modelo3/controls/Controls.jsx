import { OrbitControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls
      enablePan={true}
      minDistance={8}
      maxDistance={10}
  
    />
  );
};

export default Controls;
