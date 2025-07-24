// src/text/Title2D.jsx
import { Text } from "@react-three/drei";

const Title2D = ({ title, position = [0, 1.8, 0] }) => {
  return (
    <Text
      fontSize={0.18}
      position={position}
      color="black"
      anchorX="center"
      anchorY="middle"
    >
      {title}
    </Text>
  );
};

export default Title2D;
