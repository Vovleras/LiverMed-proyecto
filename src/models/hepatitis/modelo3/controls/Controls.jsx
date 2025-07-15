import { OrbitControls, useKeyboardControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
  );
};

export default Controls;