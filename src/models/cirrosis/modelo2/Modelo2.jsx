import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Torso } from './models-3d/torso'

const Modelo2 = () => {
    const [sickLevel, setSickLevel] = useState(0)
    const canvasRef = useRef(null)
    
    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault()
            setSickLevel(prev => {
                // Ajusta la sensibilidad y los límites (0 a 1)
                const delta = e.deltaY * -0.001
                return Math.min(1, Math.max(0, prev + delta))
            })
        }

        const canvas = canvasRef.current
        canvas.addEventListener('wheel', handleWheel, { passive: false })
        
        return () => {
            canvas.removeEventListener('wheel', handleWheel)
        }
    }, [])

    return (        
        <div ref={canvasRef} style={{ width: "35vw", height: "75vh" }}>
            <Canvas 
                camera={{ position: [1, 1, 6], fov: 45 }} 
                shadows={true}
                style={{ width: "100%", height: "100%" }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[5, 5, 5]} intensity={1} />
                <OrbitControls enableZoom={false} /> {/* Desactiva zoom para evitar conflicto */}
                <Torso sickLevel={sickLevel} />
            </Canvas>
        </div>
    )
}

export default Modelo2