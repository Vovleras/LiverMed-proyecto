import { OrbitControls, useKeyboardControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls enableZoom={false} enablePan={true} enableRotate={true} />
  );
};

export default Controls;
