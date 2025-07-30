import React, { useRef, useEffect, useState } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import AudioManager from '../staging/AudioManager'

export default function Model({ 
  currentAnimation = 'idle', 
  onAnimationComplete,
  ...props 
}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/models-3d/models-cirrosis/socio.glb')
  const { actions } = useAnimations(animations, group)
  const [prevAnimation, setPrevAnimation] = useState(currentAnimation)
  const [animationTime, setAnimationTime] = useState(0)
  const [playAudio, setPlayAudio] = useState(false)
  const audioDelay = 3.4

  useEffect(() => {
    Object.values(actions).forEach(action => action.stop())
    if (actions[currentAnimation]) {
      actions[currentAnimation]
        .reset()
        .fadeIn(0.5)
        .play()
      setAnimationTime(0)
      setPlayAudio(false)
    }
    setPrevAnimation(currentAnimation)
  }, [currentAnimation, actions])

  useFrame(() => {
    if (currentAnimation !== 'idle' && actions[currentAnimation]) {
      const action = actions[currentAnimation]
      if (action.isRunning()) {
        const newTime = action.time / action.getClip().duration
        setAnimationTime(newTime)
        
        if (currentAnimation === 'tomaita' && action.time >= audioDelay && !playAudio) {
          setPlayAudio(true)
        }

        if (newTime >= 0.99 && prevAnimation === currentAnimation) {
          if (onAnimationComplete) {
            onAnimationComplete()
          }
          setPrevAnimation('idle')
          setPlayAudio(false)
        }
      }
    }
  })

  return (
    <group ref={group}
      {...props}
      onClick={props.onClick}
      castShadow
      dispose={null}>
      <group name="Scene">
        <group name="Armature">
          <skinnedMesh
            name="EyeLeft"
            geometry={nodes.EyeLeft.geometry}
            material={materials.Eyes}
            skeleton={nodes.EyeLeft.skeleton}
            morphTargetDictionary={nodes.EyeLeft.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeLeft.morphTargetInfluences}
            castShadow
          />
          <skinnedMesh
            name="EyeRight"
            geometry={nodes.EyeRight.geometry}
            material={materials.Eyes}
            skeleton={nodes.EyeRight.skeleton}
            morphTargetDictionary={nodes.EyeRight.morphTargetDictionary}
            morphTargetInfluences={nodes.EyeRight.morphTargetInfluences}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Body"
            geometry={nodes.Wolf3D_Body.geometry}
            material={materials.Body}
            skeleton={nodes.Wolf3D_Body.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Hair"
            geometry={nodes.Wolf3D_Hair.geometry}
            material={materials.Hair}
            skeleton={nodes.Wolf3D_Hair.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Head"
            geometry={nodes.Wolf3D_Head.geometry}
            material={materials.Head}
            skeleton={nodes.Wolf3D_Head.skeleton}
            morphTargetDictionary={nodes.Wolf3D_Head.morphTargetDictionary}
            morphTargetInfluences={nodes.Wolf3D_Head.morphTargetInfluences}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Bottom"
            geometry={nodes.Wolf3D_Outfit_Bottom.geometry}
            material={materials.Bottom}
            skeleton={nodes.Wolf3D_Outfit_Bottom.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Footwear"
            geometry={nodes.Wolf3D_Outfit_Footwear.geometry}
            material={materials.Footwear}
            skeleton={nodes.Wolf3D_Outfit_Footwear.skeleton}
            castShadow
          />
          <skinnedMesh
            name="Wolf3D_Outfit_Top"
            geometry={nodes.Wolf3D_Outfit_Top.geometry}
            material={materials.Top}
            skeleton={nodes.Wolf3D_Outfit_Top.skeleton}
            castShadow
          />
          
           <primitive object={nodes.Hips}>
            {currentAnimation === 'tomaita' && (
              <AudioManager 
                url="/models-3d/models-cirrosis/staging/sound/traganding.mp3" 
                play={playAudio}
                distance={4}
                rolloffFactor={2}
                refDistance={0.5}
              />
            )}
          </primitive>
        </group>

        <group
          name="Sketchfab_model"
          position={[-0.01134791, 1.0087769, 0.13983825]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.07669178}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Cylinder_2" />
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models-3d/models-cirrosis/socio.glb");
