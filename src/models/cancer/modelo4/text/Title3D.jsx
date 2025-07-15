import { Center, Text3D } from "@react-three/drei";

const Title3D = ({ title }) => {
  return (
    <Center position={[0.23, 2.8, 0]}>
      <Text3D
        font="/fonts/unicorn.json"
        bevelEnabled
        bevelSize={0.0007}
        bevelThickness={0.0002}
        height={0.0001}
        lineHeight={0.3}
        letterSpacing={0.04}
        size={0.26}
      >
        {` ${title} `}
        <meshStandardMaterial color={"#0d1533"} />
      </Text3D>
    </Center>
  );
};

export default Title3D;
