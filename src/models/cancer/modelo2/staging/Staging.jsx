import { Cloud, Environment, Sparkles, Stars } from "@react-three/drei";
import { useMemo } from "react";
const Staging = () => {
  return (
    <>
      {/* Fondo que coincide exactamente */}
      {/* <Sparkles
        count={30}
        speed={1.8}
        color="#b1b6c8"
        size={3.5}
        scale={[8, 8, 8]}
        noise={1}
        opacity={2.6}
      /> */}
      <Sparkles
        count={2}
        size={7}
        speed={0.9}
        color="beige"
        noise={10}
        opacity={2}
        position={[0, 2.89, 0]} // Cambia la posición de las chispas
      />

      <Stars />

      <Cloud
        position={[0, 2.7, 0]} // Aleja la nube en el eje Z (fondo)
        scale={[0.18, 0.18, 0.18]} // Haz la nube más grande para que cubra el fondo
        opacity={0.7}
        volume={3.5} // Aumenta el volumen para que la nube sea más densa
      />

      <Environment preset="sunset" />
    </>
  );
};

export default Staging;
