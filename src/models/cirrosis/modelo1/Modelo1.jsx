import { Canvas } from '@react-three/fiber'
import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useInView } from 'react-intersection-observer'

import CirrhoticLiver from './models-3d/cirrhoticLiver'
import Lights from './lights/Lights'
import Controls from './controls/Controls'

function LiverModel() {
  const liverRef = useRef()
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key.toLowerCase() === 'p') setIsPaused(prev => !prev)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame((state, delta) => {
    if (!isPaused && liverRef.current) {
      liverRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={liverRef}>
      <CirrhoticLiver />
      <Text
        position={[0.8, -0.6, -0.2]}
        fontSize={0.2}
        color="#1e2742"
        anchorX="center"
        anchorY="middle"
        onClick={() => setIsPaused(prev => !prev)}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = 'default')}
      >
        {isPaused ? '▶' : '⏸'}
      </Text>
    </group>
  )
}

export default function Modelo1() {
  const { ref: containerRef, inView } = useInView({ threshold: 0.5 })

  return (
    <>
      <div ref={containerRef} style={{ height: '100px' }} />
      <Canvas
        shadows
        camera={{ position: [0, 1, 5], fov: 45 }}
        style={{ background: '#b1b6c8', height: '500px' }}
      >
        <Lights />
        <LiverModel isVisible={inView} />
        <Controls />
      </Canvas>
    </>
  )
}
