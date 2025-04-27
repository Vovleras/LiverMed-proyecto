import { OrbitControls} from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls
        enablePan={false}
        minDistance={3}
        maxDistance={10}
        autoRotate={false}
      />
  );
};

export default Controls;