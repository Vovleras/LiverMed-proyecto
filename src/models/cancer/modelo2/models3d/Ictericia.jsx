import React, { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Ictericia(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models-3d/ictericia.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.Body}
            skeleton={nodes.Body.skeleton}
          />
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.EyeRight}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.EyeRight}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
          />
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials.Hair}
            skeleton={nodes.Hair.skeleton}
          />
          <skinnedMesh
            name="Head_1"
            geometry={nodes.Head_1.geometry}
            material={materials.Head}
            skeleton={nodes.Head_1.skeleton}
            morphTargetDictionary={nodes.Head_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Head_1.morphTargetInfluences}
          />
          <skinnedMesh
            name="OutfitBottom"
            geometry={nodes.OutfitBottom.geometry}
            material={materials.OutfitBottom}
            skeleton={nodes.OutfitBottom.skeleton}
          />
          <skinnedMesh
            name="OutfitFootwear"
            geometry={nodes.OutfitFootwear.geometry}
            material={materials.OutfitFootwear}
            skeleton={nodes.OutfitFootwear.skeleton}
          />
          <skinnedMesh
            name="OutfitTop"
            geometry={nodes.OutfitTop.geometry}
            material={materials.OutfitTop}
            skeleton={nodes.OutfitTop.skeleton}
          />
          <skinnedMesh
            name="Teeth"
            geometry={nodes.Teeth.geometry}
            material={materials.Teeth}
            skeleton={nodes.Teeth.skeleton}
            morphTargetDictionary={nodes.Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Teeth.morphTargetInfluences}
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/ictericia.glb");
