import { Center, Text3D } from "@react-three/drei";
import { useState } from "react";

const Title = ({ title, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Center position={[-0.03, 2.3, 0]}>
      <Text3D
        font="/fonts/unicorn.json"
        bevelEnabled
        bevelSize={0.01}
        bevelThickness={0.02}
        height={0.01}
        lineHeight={0.8}
        letterSpacing={0.02}
        size={0.2}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        cursor="pointer"
      >
        {` ${title} `}
        <meshStandardMaterial color={hovered ? "#404a6e" : "#0d1533"} />
      </Text3D>
    </Center>
  );
};

export default Title;
