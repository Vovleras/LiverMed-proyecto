import { OrbitControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
  );
};

export default Controls;
