const Modelo1 = () => {
  return (
    <div>
      <img src="/imagenes/liver.png" alt="Órgano representado" />
    </div>
  );
};

export default Modelo1;

// import React, { useRef } from "react";
// import { useGLTF } from "@react-three/drei";

// export function Modelo1(props) {
//   const { nodes, materials } = useGLTF("/models-3d/hcc.glb");
//   return (
//     <group {...props} dispose={null}>
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.LiverLeft?.geometry}
//         material={materials.LiverLeftMaterial}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.LiverCenter?.geometry}
//         material={materials.LiverCenterMaterial}
//       />
//       <mesh
//         castShadow
//         receiveShadow
//         geometry={nodes.LiverRight?.geometry}
//         material={materials.LiverRightMaterial}
//       />
//     </group>
//   );
// }

// useGLTF.preload("/models-3d/hcc.glb");
