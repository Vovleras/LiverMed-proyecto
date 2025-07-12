import { Center, Text3D } from "@react-three/drei";
import React from "react";

const Title = ({ title }) => {
  return (
    <Center position={[0, 2, 0]}>
      <Text3D
        font="/fonts/unicorn.json"
        size={0.3}                // Aumentado para que se vea más grande
        height={0.03}             // Grosor del texto
        lineHeight={0.5}
        letterSpacing={0.05}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.04}
      >
        {` ${title} `}
        <meshStandardMaterial color={"#0d1533"} />
      </Text3D>
    </Center>
  );
};

export default Title;

