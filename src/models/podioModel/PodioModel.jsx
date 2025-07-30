import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { PodioModel } from './models-3d/podio'
import Staging from './staging/Staging'

export default function Podio() {

  return (
    <Canvas shadows camera={{ position: [-6,4.7,3] }}
        style={{ width: '100%', height: '100%', borderRadius:'3vh 0 0 3vh', background: 'radial-gradient(circle at center,#d2d5dfff 0%, #757E9D 80%)'}}> 

      <ambientLight intensity={0.5} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} />
      
      <Staging/>
      
      <Suspense fallback={null}>
        <PodioModel scale={1} position={[0, 0, 0]} />
      </Suspense>
    </Canvas>
  )
}