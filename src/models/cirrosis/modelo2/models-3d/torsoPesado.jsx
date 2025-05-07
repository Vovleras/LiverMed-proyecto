import React, { useRef, useEffect, useMemo } from 'react';
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
      texture.encoding = texture === textures.healthyColor || texture === textures.sickColor 
        ? THREE.sRGBEncoding 
        : THREE.LinearEncoding;
    });
  }, [textures]);

  const mixedColorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = textures.healthyColor.image.width;
    canvas.height = textures.healthyColor.image.height;

    return canvas;
  }, [textures.healthyColor, textures.sickColor]);

  const materialRef = useRef();

  useEffect(() => {
    if (materialRef.current && textures.healthyColor && textures.sickColor) {

      const ctx = mixedColorTexture.getContext('2d');
      ctx.globalAlpha = 1.0;
      ctx.drawImage(textures.healthyColor.image, 0, 0);
      ctx.globalAlpha = sickLevel; 
      ctx.drawImage(textures.sickColor.image, 0, 0);

      const mixedTexture = new THREE.CanvasTexture(mixedColorTexture);
      mixedTexture.encoding = THREE.sRGBEncoding;
      mixedTexture.flipY = false;

      materialRef.current.map = mixedTexture;
      materialRef.current.normalMap = sickLevel > 0.5 ? textures.sickNormal : textures.healthyNormal;
      materialRef.current.roughnessMap = sickLevel > 0.5 ? textures.sickRough : textures.healthyRough;
      materialRef.current.needsUpdate = true;
    }
  }, [sickLevel, textures, mixedColorTexture]);

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