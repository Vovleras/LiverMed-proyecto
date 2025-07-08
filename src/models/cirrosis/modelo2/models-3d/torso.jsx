import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export function Torso({ sickLevel }) {
  const { nodes } = useGLTF('/models-3d/models-cirrosis/TwoTorso.glb');
  const meshRef = useRef();
  const materialRef = useRef();
  const [texturesLoaded, setTexturesLoaded] = useState(false);

  const textures = useTexture({
    healthyColor: '/models-3d/models-cirrosis/textures/Color.jpg',
    sickNormal: '/models-3d/models-cirrosis/textures/IcNormal.jpg',
    healthyNormal: '/models-3d/models-cirrosis/textures/Normal.jpg',
    Rough: '/models-3d/models-cirrosis/textures/MetalicRoughness.jpg',
  }, (loadedTextures) => {
    Object.values(loadedTextures).forEach(texture => {
      texture.flipY = false;
      texture.encoding = texture === loadedTextures.healthyColor 
        ? THREE.sRGBEncoding 
        : THREE.LinearEncoding;
    });
    setTexturesLoaded(true);
  });

  const mixedColorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    if (textures.healthyColor?.image) {
      canvas.width = textures.healthyColor.image.width;
      canvas.height = textures.healthyColor.image.height;
    }
    return canvas;
  }, [textures.healthyColor]);

  const tintedTextureRef = useRef();

  useEffect(() => {
    if (!texturesLoaded || !textures.healthyColor?.image) return;

    const ctx = mixedColorTexture.getContext('2d');
    const width = textures.healthyColor.image.width;
    const height = textures.healthyColor.image.height;
    ctx.clearRect(0, 0, width, height);

    ctx.globalAlpha = 1.0;
    ctx.drawImage(textures.healthyColor.image, 0, 0);

    if (sickLevel > 0) {
      const h = THREE.MathUtils.lerp(0.15, 0.16, sickLevel);
      const s = THREE.MathUtils.lerp(0.6, 1.0, sickLevel);
      const l = THREE.MathUtils.lerp(0.4, 0.5, sickLevel);   
      const color = new THREE.Color().setHSL(h, s, l);

      ctx.globalAlpha = 0.16 + 0.2 * sickLevel;
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

    return () => {
      if (tintedTextureRef.current) {
        tintedTextureRef.current.dispose();
      }
    };
  }, [sickLevel, textures, mixedColorTexture, texturesLoaded]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.morphTargetInfluences[0] = sickLevel;
    }
  });

  if (!texturesLoaded) return null;

  return (
    <mesh
      ref={meshRef}
      geometry={nodes.healthy.geometry}
      morphTargetDictionary={nodes.healthy.morphTargetDictionary}
      morphTargetInfluences={nodes.healthy.morphTargetInfluences}
      castShadow
    >
      <meshStandardMaterial 
        ref={materialRef} 
        transparent={false} 
        roughness={1}
        metalness={0}
      />
    </mesh>
  );
}

useGLTF.preload('/models-3d/models-cirrosis/TwoTorso.glb');