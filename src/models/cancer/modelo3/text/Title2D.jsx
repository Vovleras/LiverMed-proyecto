import { Html, Text } from "@react-three/drei";

const Title2D = ({ title }) => {
  return (
    <Text
      font="/fonts/unicorn.ttf"
      fontSize={0.2}
      position={[0.3, 1.46, 0]}
      color={"#404a6e"}
      anchorX={"center"}
      anchorY={"middle"}
    >
      {title}
    </Text>
  );
};

export default Title2D;
