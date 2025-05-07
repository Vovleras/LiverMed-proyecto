import { Canvas } from '@react-three/fiber'
import { useInView } from 'react-intersection-observer'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

import Liver from './models-3d/Liver'

import { OrbitControls} from "@react-three/drei";
import { Environment } from '@react-three/drei'


function Modelo({ ...props }) {
  const liverRef = useRef()
  const inView = useInView({ threshold: 0.5 })

  useFrame((state, delta) => {
    if (inView) {
      liverRef.current.rotation.y += delta * 0.24
    }
  })

  return (
    <group ref={liverRef} {...props}>
      <Liver />
    </group>
  )
}

export default function LiverModel() {
  return (
    <Canvas
    shadows={true}
      camera={{ position: [1, 1, 2], fov: 45 }}
      style={{ background: '#b1b6c8', height: "70vh" }}
    >
      <Environment preset="city" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.1}
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />     
      
            <mesh
              receiveShadow
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, -1.5, 0]}
            >
                <planeGeometry args={[50, 50]} />
                <shadowMaterial opacity={0.2} />
            </mesh>
      <Modelo position={[0, 0, 0]} />
      <OrbitControls
            minDistance={2}
            maxDistance={7}
              enablePan={false}
              autoRotate={false}
        />
    </Canvas>
  )
}
