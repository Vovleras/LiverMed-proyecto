import { useEffect, useRef } from 'react'
import { AudioListener, PositionalAudio, AudioLoader } from 'three'
import { useThree } from '@react-three/fiber'

export default function AudioManager({ url, play, distance = 5, rolloffFactor = 1, refDistance = 1 }) {
  const soundRef = useRef()
  const { camera, scene } = useThree()

  useEffect(() => {
    const listener = new AudioListener()
    camera.add(listener)

    const sound = new PositionalAudio(listener)
    soundRef.current = sound


    sound.setRefDistance(refDistance)
    sound.setRolloffFactor(rolloffFactor) 
    sound.setDistanceModel('exponential') 
    sound.setMaxDistance(distance)

    const audioLoader = new AudioLoader()
    audioLoader.load(url, (buffer) => {
      sound.setBuffer(buffer)
      sound.setLoop(false)
      scene.add(sound)

      if (play) {
        sound.play()
      }
    })

    return () => {
      if (soundRef.current) {
        soundRef.current.stop()
        scene.remove(soundRef.current)
        camera.remove(listener)
      }
    }
  }, [url, distance, rolloffFactor, refDistance])

  useEffect(() => {
    if (!soundRef.current) return

    if (play) {
      // Solo reproducir si el audio está cargado y no se está reproduciendo ya
      if (soundRef.current.buffer && !soundRef.current.isPlaying) {
        soundRef.current.play()
      }
    } else {
      if (soundRef.current.isPlaying) {
        soundRef.current.stop()
      }
    }
  }, [play])

  return null
}