import { OrbitControls } from "@react-three/drei";

const Controls = () => {
  return (
    <OrbitControls
      enableZoom={false}
      minAzimuthAngle={-Math.PI / 4}
      maxAzimuthAngle={Math.PI / 4}
      minPolarAngle={Math.PI / 3}
      maxPolarAngle={Math.PI / 2}
      minDistance={2}
      maxDistance={10}
    />
  );
};

export default Controls;
