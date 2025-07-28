import { Text } from "@react-three/drei";

const Title2D = ({ title }) => {
  return (
    <Text
      font="/fonts/unicorn.ttf"
      fontSize={0.15}
      position={[0, 1.5, 1]}
      color={"#404a6e"}
      anchorX={"center"}
      anchorY={"middle"}
    >
      {title}
    </Text>
  );
};

export default Title2D;