import Controls from "./controls/Controls";
import { Pillls } from "./models3d/pillls";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, SoftShadows } from "@react-three/drei";
import Lights from "./lights/Lights";
import Recipient from "./models3d/Recipient";
import Title from "./text/Title.jsx";
import Title2D from "./text/Title2D";
import { useRef } from "react";

const PilllsAnimation = (props) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = Math.sin(clock.getElapsedTime()) * 0.4;
    }
  });
  return (
    <group ref={ref} {...props}>
      <Pillls scale={[23, 23, 23]} position={[0, -0.7, 0]} receiveShadow />
    </group>
  );
};

const Modelo3 = () => {
  return (
    <Canvas shadows={true} style={{ width: "550px", height: "690px" }}>
      <PerspectiveCamera makeDefault position={[0, 3.2, 7]} />
      <Lights />
      <Controls />
      <PilllsAnimation />
      <Recipient />
      <SoftShadows size={20} samples={10} focus={0.9} />
      <Title title={"Cuidado Integral"} />
      <Title2D title={"Colestiramina oral"} />
    </Canvas>
  );
};

export default Modelo3;
