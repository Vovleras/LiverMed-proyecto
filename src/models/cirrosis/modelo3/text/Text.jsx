import { Text } from '@react-three/drei';

const TextoM2 = () => {
  return (
    <Text
        position={[0, 4, 1.7]}
        color="black"
        fontSize={0.5}
        maxWidth={5} 
        lineHeight={1}
        letterSpacing={0.02}
        textAlign="center"
        anchorX="center"
        anchorY="middle" 
        rotation={[0, 4 * Math.PI / 3.12, 0]}
      >
        Medicamentos
    </Text>
  );
};

export default TextoM2;