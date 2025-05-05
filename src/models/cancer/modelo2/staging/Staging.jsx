import { Cloud, Environment, Sky, Sparkles, Stars } from "@react-three/drei";
import { Color } from "three";

const Staging = () => {
  return (
    <>
      <Sparkles
        count={256} // Number of particles (default: 100)
        speed={1.5} // Speed of particles (default: 1)
        opacity={2} // Opacity of particles (default: 1)
        color="#b1b6c8" // Color of particles (default: 100)
        size={4} // Size of particles (default: randomized between 0 and 1)
        scale={[10, 10, 10]} // The space the particles occupy (default: 1)
        noise={1} // Movement factor (default: 1)
      />
      <Environment preset="night" />
    </>
  );
};

export default Staging;
