import React, { useState, useCallback } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import SocioModel from './models-3d/socioModel'
import { Environment } from '@react-three/drei'

import InteractiveQuestionMark from './text/Text'

function Modelo() {
  const [animation, setAnimation] = useState('idle') 
  const [VentanaInfo, setVentanaInfo] = useState(false);

  const handleAnimationComplete = () => {
    if (animation === 'tomaita') {
      setAnimation('idle')
    }
  }

  const handleModelClick = useCallback(() => {
    setAnimation('tomaita')
  }, [])

  return (
    <div className="modelo3-cirrosis" tabIndex="0">
      <Canvas onPointerMissed={() => setVentanaInfo(false)} 
            camera={{ position: [-2, 2, 5], fov: 50 }}
            style={{ width: '100%', height: '100%' }}
            shadows={true}>

        <directionalLight
          position={[2, 5, 2]}
          intensity={10}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={20}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
          <planeGeometry args={[50, 50]} />
          <shadowMaterial opacity={0.3} />
        </mesh>

        <InteractiveQuestionMark 
            VentanaInfo={VentanaInfo} 
            setVentanaInfo={setVentanaInfo} 
        />

        <Environment 
                files={"/models-3d/models-cirrosis/staging/hdris/cespednse.hdr"}
                background
                ground={{
                    height: 1,
                    radius: 15,
                    scale: 100,
                }}
            />
        <SocioModel
          currentAnimation={animation}
          onAnimationComplete={handleAnimationComplete}
          onClick={handleModelClick}
        />

        <OrbitControls
          enableZoom={true}
          target={[0, 1, 0]}
          minDistance={2}
          maxDistance={3}
        />
      </Canvas>
    </div>
  )
}

export default Modelo;