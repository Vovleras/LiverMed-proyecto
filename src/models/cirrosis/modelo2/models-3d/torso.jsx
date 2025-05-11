import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Torso({ sickLevel }) {
  const { nodes } = useGLTF('/models-3d/models-cirrosis/TwoTorso.glb');
  const meshRef = useRef();
  const materialRef = useRef();

  const textures = useTexture({
    healthyColor: '/models-3d/models-cirrosis/textures/Color.jpg',
    sickNormal: '/models-3d/models-cirrosis/textures/IcNormal.jpg',
    healthyNormal: '/models-3d/models-cirrosis/textures/Normal.jpg',
    Rough: '/models-3d/models-cirrosis/textures/MetalicRoughness.jpg',
  });

  useEffect(() => {
    Object.values(textures).forEach((texture) => {
      texture.flipY = false;
      texture.encoding =
        texture === textures.healthyColor ? THREE.sRGBEncoding : THREE.LinearEncoding;
    });
  }, [textures]);

  const mixedColorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = textures.healthyColor.image.width;
    canvas.height = textures.healthyColor.image.height;

    return canvas;
  }, [textures.healthyColor]);

  const tintedTextureRef = useRef();

  useEffect(() => {
    if (materialRef.current && textures.healthyColor?.image) {
      const ctx = mixedColorTexture.getContext('2d');
      const width = textures.healthyColor.image.width;
      const height = textures.healthyColor.image.height;
      ctx.clearRect(0, 0, width, height);


      ctx.globalAlpha = 1.0;
      ctx.drawImage(textures.healthyColor.image, 0, 0);


      if (sickLevel > 0) {
        const h = THREE.MathUtils.lerp(0.08, 0.17, sickLevel); 
        const s = THREE.MathUtils.lerp(0.4, 1.0, sickLevel);
        const l = THREE.MathUtils.lerp(0.4, 0.6, sickLevel);   
        const color = new THREE.Color().setHSL(h, s, l);



        ctx.globalAlpha = 0.08 + 0.2 * sickLevel;
        ctx.fillStyle = `#${color.getHexString()}`;
        ctx.fillRect(0, 0, width, height);
      }

      if (!tintedTextureRef.current) {
        tintedTextureRef.current = new THREE.CanvasTexture(mixedColorTexture);
        tintedTextureRef.current.encoding = THREE.sRGBEncoding;
        tintedTextureRef.current.flipY = false;
      } else {
        tintedTextureRef.current.needsUpdate = true;
      }

      materialRef.current.map = tintedTextureRef.current;
      materialRef.current.normalMap = sickLevel > 0.5 ? textures.sickNormal : textures.healthyNormal;
      materialRef.current.roughnessMap = textures.Rough;
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
      <meshStandardMaterial ref={materialRef} transparent={false} />
    </mesh>
  );
}

useGLTF.preload('/models-3d/models-cirrosis/TwoTorso.glb');
