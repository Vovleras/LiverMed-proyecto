import React, { useState, useRef, useEffect } from 'react'
import { useGLTF, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import useAuthStore from '../../../store/use-auth-store.js'

export function PodioModel({ ...props }) {
  const [topPlayers, setTopPlayers] = useState({
    primero: {puntaje: 5, nombre: '---', foto: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'},
    segundo: {puntaje: 3, nombre: '---', foto: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'},
    tercero: {puntaje: 3, nombre: '---', foto: 'https://cdn-icons-png.flaticon.com/512/12225/12225881.png'}
  });
  
  const { nodes, materials } = useGLTF('/models-3d/home-model/podio.glb')
  const [animationState, setAnimationState] = useState({ progress: 0, started: false })
  const startTime = useRef(null)
  const delay = 0.2
  const animationDuration = 2.1
  const easeOutQuad = (t) => t * (2 - t)
  const getTopThreePlayers = useAuthStore(state => state.getTopThreePlayers);

  // Me gusta solo un nombre para que no se pase para donde no debe
  const formatName = (fullName) => {
    if (!fullName || fullName === '---') return fullName;
    
    const firstName = fullName.split(' ')[0];
 
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  }

  useEffect(() => {
    const loadPlayersData = async () => {
      try {
        const players = await getTopThreePlayers();
        if (players.length >= 3) {
          setTopPlayers({
            primero: {
              ...players[0],
              nombre: formatName(players[0].nombre)
            },
            segundo: {
              ...players[1],
              nombre: formatName(players[1].nombre)
            },
            tercero: {
              ...players[2],
              nombre: formatName(players[2].nombre)
            }
          });
        }
      } catch (error) {
        console.error("Error loading players data:", error);
      }
    };

    loadPlayersData();

    const timer = setTimeout(() => {
      setAnimationState(prev => ({ ...prev, started: true }))
    }, delay * 1000)
    
    return () => clearTimeout(timer)
  }, [])

  useFrame((state) => {
    if (!animationState.started || startTime.current === null) {
      startTime.current = state.clock.elapsedTime
      return
    }
    const elapsed = state.clock.elapsedTime - startTime.current
    const newProgress = Math.min(elapsed / animationDuration, 1)
    if (newProgress !== animationState.progress) {
      setAnimationState(prev => ({ ...prev, progress: newProgress }))
    }
  })

  const calculateInfluences = (progressValue) => {
    const values = [
      topPlayers.primero.puntaje,
      topPlayers.segundo.puntaje,
      topPlayers.tercero.puntaje
    ];
    
    const [max, mid, min] = [...values].sort((a, b) => b - a)
    const scaleInfluence = (value, min, max, outMin = 0, outMax = 0.65) => {
        if (max === min) return outMin
        const proportion = (max - value) / (max - min)
        return outMin + proportion * (outMax - outMin)
    }

    const oroFinal = scaleInfluence(max, min, max)
    const plataFinal = scaleInfluence(mid, min, max)
    const bronceFinal = scaleInfluence(min, min, max)

    return {
      oroInfluence: THREE.MathUtils.lerp(1, oroFinal, easeOutQuad(progressValue)),
      plataInfluence: THREE.MathUtils.lerp(1, plataFinal, easeOutQuad(progressValue)),
      bronceInfluence: THREE.MathUtils.lerp(1, bronceFinal, easeOutQuad(progressValue))
    }
  }

  const { oroInfluence, plataInfluence, bronceInfluence } = calculateInfluences(animationState.progress)

  return (
    <group {...props} dispose={null}>
      {/* Plata */}
      <mesh
        geometry={nodes.Plata.geometry}
        material={materials.silver}
        morphTargetDictionary={nodes.Plata.morphTargetDictionary}
        morphTargetInfluences={[plataInfluence]}
        position={[-1.543, 2.213, -0.751]}
        castShadow receiveShadow
      />
      <Html
        position={[-1.543, 5.6 - (plataInfluence  * 3.7), -0.751]}
        center
        distanceFactor={5}
      >
        <div className="Persona">
          <img src={topPlayers.segundo.foto} style={{ width: '20vh', borderRadius: '3vh' }} />
          <h1>{topPlayers.segundo.nombre}</h1>
          <p>{(topPlayers.segundo.puntaje) * 20}%</p>
        </div>
      </Html>

      {/* Bronce */}
      <mesh
        geometry={nodes.Bronce.geometry}
        material={materials.copper}
        morphTargetDictionary={nodes.Bronce.morphTargetDictionary}
        morphTargetInfluences={[bronceInfluence]}
        position={[0.736, 2.213, 1.53]}
        castShadow receiveShadow
      />
      <Html
        position={[0.736, 5.6 - (bronceInfluence * 3.7)  , 1.7]}
        center
        distanceFactor={5}
      >
        <div className="Persona">
          <img src={topPlayers.tercero.foto} style={{ width: '20vh', borderRadius: '3vh' }} />
          <h1>{topPlayers.tercero.nombre}</h1>
          <p>{topPlayers.tercero.puntaje * 20}%</p>
        </div>
      </Html>

      {/* Oro */}
      <mesh
        geometry={nodes.Oro.geometry}
        material={materials.gold}
        morphTargetDictionary={nodes.Oro.morphTargetDictionary}
        morphTargetInfluences={[oroInfluence]}
        position={[-0.004, 2.213, 0.011]}
        castShadow receiveShadow
      />
      <Html
        position={[-0.004, 5.6 - (oroInfluence * 3.7), 0.011]}
        center
        distanceFactor={5}
      >
        <div className="Persona">
          <img src={topPlayers.primero.foto} style={{ width: '20vh', borderRadius: '3vh' }} />
          <h1>{topPlayers.primero.nombre}</h1>
          <p>{topPlayers.primero.puntaje * 20}%</p>
        </div>
      </Html>
    </group>
  )
}