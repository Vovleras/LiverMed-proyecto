import React, { useRef, useState } from "react";
import { useGLTF, useAnimations, useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useCallback } from "react";

export function Ictericia({ actionRef, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models-3d/models-cancer/ictericia.glb"
  );
  const { actions } = useAnimations(animations, group);
  const [currentAction, setCurrentAction] = useState("Idle");

  const [, get] = useKeyboardControls();

  useFrame(() => {
    const { Pain } = get();
    if (Pain) {
      const action = actions["Pain"];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
      setCurrentAction("Pain");
    }
  });

  useEffect(() => {
    if (actionRef) {
      actionRef.current = (name) => {
        const action = actions[name];
        if (action) {
          action.reset().fadeIn(0.5).play();
          setCurrentAction(name);
        }
      };
    }
  }, [actions, actionRef]);

  useEffect(() => {
    const action = actions[currentAction];
    if (action) {
      action.fadeIn(0.5).play();

      let timeoutId;
      if (currentAction === "Pain") {
        timeoutId = setTimeout(() => {
          setCurrentAction("Idle");
        }, 2000);
      }

      return () => {
        action.fadeOut(0.5);
        if (timeoutId) clearTimeout(timeoutId);
      };
    }
  }, [actions, currentAction]);

  const handleAvatar = useCallback(
    (e) => {
      e.stopPropagation();
      const action = actions["Pain"];
      if (action) {
        action.reset().fadeIn(0.5).play();
      }
      setCurrentAction("Pain");
    },
    [actions]
  );
  return (
    <group ref={group} {...props} dispose={null} onClick={handleAvatar}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="Body"
            geometry={nodes.Body.geometry}
            material={materials.Body}
            skeleton={nodes.Body.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.EyeRight}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.EyeRight}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Hair"
            geometry={nodes.Hair.geometry}
            material={materials.Hair}
            skeleton={nodes.Hair.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Head_1"
            geometry={nodes.Head_1.geometry}
            material={materials.Head}
            skeleton={nodes.Head_1.skeleton}
            morphTargetDictionary={nodes.Head_1.morphTargetDictionary}
            morphTargetInfluences={nodes.Head_1.morphTargetInfluences}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="OutfitBottom"
            geometry={nodes.OutfitBottom.geometry}
            material={materials.OutfitBottom}
            skeleton={nodes.OutfitBottom.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="OutfitFootwear"
            geometry={nodes.OutfitFootwear.geometry}
            material={materials.OutfitFootwear}
            skeleton={nodes.OutfitFootwear.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="OutfitTop"
            geometry={nodes.OutfitTop.geometry}
            material={materials.OutfitTop}
            skeleton={nodes.OutfitTop.skeleton}
            castShadow
            receiveShadow
          />
          <skinnedMesh
            name="Teeth"
            geometry={nodes.Teeth.geometry}
            material={materials.Teeth}
            skeleton={nodes.Teeth.skeleton}
            morphTargetDictionary={nodes.Teeth.morphTargetDictionary}
            morphTargetInfluences={nodes.Teeth.morphTargetInfluences}
            castShadow
            receiveShadow
          />
          <primitive object={nodes.Hips} />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models-3d/models-cancer/ictericia.glb");
