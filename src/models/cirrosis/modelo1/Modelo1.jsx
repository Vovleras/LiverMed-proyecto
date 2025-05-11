import { Canvas } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import CirrhoticLiver from './models-3d/cirrhoticLiver'
import Lights from './lights/Lights'
import Controls from './controls/Controls'

function LiverModel({ ...props }) {
  const liverRef = useRef()
  const inView = useInView({ threshold: 0.5 })

  useFrame((state, delta) => {
    if (inView) {
      liverRef.current.rotation.y += delta * 0.4
    }
  })

  return (
    <group ref={liverRef} {...props}>
      <CirrhoticLiver />
    </group>
  )
}

export default function Modelo1() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 1, 5], fov: 45 }}
      style={{ background: '#b1b6c8' }}
    >
      <Lights/>
      <LiverModel position={[0, 0, 0]} />
      <Controls />
    </Canvas>
  )
}
