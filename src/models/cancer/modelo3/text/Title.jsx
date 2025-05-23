import { Center, Text3D } from "@react-three/drei";

const Title = ({ title }) => {
  return (
    <Center position={[0.3, 1.83, 0]}>
      <Text3D
        font="/fonts/unicorn.json"
        bevelEnabled
        bevelSize={0.007}
        bevelThickness={0.02}
        height={0.001}
        lineHeight={0.3}
        letterSpacing={0.04}
        size={0.2}
      >
        {` ${title} `}
        <meshStandardMaterial color={"#0d1533"} />
      </Text3D>
    </Center>
  );
};

export default Title;
