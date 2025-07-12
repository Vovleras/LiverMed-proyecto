import { Text } from "@react-three/drei";

const Title2D = ({ title }) => {
  return (
    <Text
      font="/fonts/unicorn.ttf"
      fontSize={0.2}
     position={[0, 1.5, 0]}
      color={"#404a6e"}
      anchorX={"center"}
      anchorY={"middle"}
    >
      {String(title || "")}
    </Text>
  );
};

export default Title2D;
