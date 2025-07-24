// src/text/Title3D.jsx
import { Center, Text3D } from "@react-three/drei";

const Title3D = ({ title, position = [0, 2.5, 0] }) => {
  return (
    <Center position={position}>
      <Text3D
        font="/fonts/unicorn.json"
        bevelEnabled
        bevelSize={0.002}
        bevelThickness={0.005}
        height={0.1}
        size={0.25}
        curveSegments={12}
        lineHeight={0.3}
        letterSpacing={0.04}
      >
        {title}
        <meshStandardMaterial color="#0d1533" />
      </Text3D>
    </Center>
  );
};

export default Title3D;
