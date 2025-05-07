import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Torso({ sickLevel }) {
  const { nodes } = useGLTF('/models-3d/models-cirrosis/TwoTorso.glb');
  const meshRef = useRef();

  const textures = useTexture({
    healthyColor: '/models-3d/models-cirrosis/textures/Color.jpg',
    sickColor: '/models-3d/models-cirrosis/textures/IcColor.jpg',
    healthyNormal: '/models-3d/models-cirrosis/textures/Normal.jpg',
    sickNormal: '/models-3d/models-cirrosis/textures/IcNormal.jpg',
    healthyRough: '/models-3d/models-cirrosis/textures/MetalicRoughness.jpg',
    sickRough: '/models-3d/models-cirrosis/textures/MetalicRoughness.jpg',
  });

  useEffect(() => {
    Object.values(textures).forEach((texture) => {
      texture.flipY = false;
      if (texture === textures.uColorMap1 || texture === textures.uColorMap2) {
        texture.encoding = THREE.sRGBEncoding;
      } else {
        texture.encoding = THREE.LinearEncoding;
      }
    });
  }, [textures]);

  const materialRef = useRef();

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.map = sickLevel > 0.5 ? textures.sickColor : textures.healthyColor;
      materialRef.current.normalMap = sickLevel > 0.5 ? textures.sickNormal : textures.healthyNormal;
      materialRef.current.roughnessMap = sickLevel > 0.5 ? textures.sickRough : textures.healthyRough;
      materialRef.current.needsUpdate = true;
    }
  }, [sickLevel, textures]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.morphTargetInfluences[0] = sickLevel;
    }
  });

  return (
    <mesh
      ref={meshRef}
      geometry={nodes.healthy.geometry}
      morphTargetDictionary={nodes.healthy.morphTargetDictionary}
      morphTargetInfluences={nodes.healthy.morphTargetInfluences}
    >
      <meshStandardMaterial
        ref={materialRef}
        transparent={false}
      />
    </mesh>
  );
}

useGLTF.preload('/models-3d/models-cirrosis/TwoTorso.glb');