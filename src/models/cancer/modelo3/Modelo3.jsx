import Controls from "./controls/Controls";
import { Pills } from "./models3d/pills";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";
import Lights from "./lights/Lights";
import Recipient from "./models3d/Recipient";
import { SoftShadows } from "@react-three/drei";
import Title from "./text/Title";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import Title2D from "./text/Title2D";

const PillsAnimation = (props) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.4; // Rebota en Y
    }
  });
  return (
    <group ref={ref} {...props}>
      <Pills scale={[23, 23, 23]} position={[0, -0.7, 0]} recieveShadow />
    </group>
  );
};

const Modelo3 = () => {
  return (
    <>
      <Canvas shadows={true} style={{ width: "550px", height: "690px" }}>
        <PerspectiveCamera makeDefault position={[0, 3.2, 7]} />
        <Lights />
        <Controls />
        <PillsAnimation />
        <Recipient />
        <SoftShadows size={20} samples={10} focus={0.9} />;
        <Title title={"Cuidado Integral"} />
        <Title2D title={"Hepatocarcinoma"} />
      </Canvas>
    </>
  );
};

export default Modelo3;
