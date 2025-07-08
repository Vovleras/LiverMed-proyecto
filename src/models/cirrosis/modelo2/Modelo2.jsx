import React, { useState, useRef, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { Torso } from './models-3d/torso'
import "./Modelo2.css"
import Staging from './staging/Staging'

import InteractiveQuestionMark from './text/Text'

const Modelo2 = () => {
    const [sickLevel, setSickLevel] = useState(0)
    const [isExpanded, setIsExpanded] = useState(false)
    const [VentanaInfo, setVentanaInfo] = useState(false);
    const canvasRef = useRef(null)
    
    useEffect(() => {
        const handleWheel = (e) => {
            e.preventDefault()
            setSickLevel(prev => {
                const delta = e.deltaY * -0.001
                return Math.min(1, Math.max(0, prev + delta))
            })
        }

        const handleKeyDown = (e) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                e.preventDefault()
                const delta = e.key === 'ArrowUp' ? 0.1 : -0.1
                setSickLevel(prev => Math.min(1, Math.max(0, prev + delta)))
            }
        }

        const canvas = canvasRef.current
        canvas.addEventListener('wheel', handleWheel, { passive: false })
        window.addEventListener('keydown', handleKeyDown)
        
        return () => {
            canvas.removeEventListener('wheel', handleWheel)
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (        
        <div 
            ref={canvasRef} 
            className={`modelo2-cirrosis ${isExpanded ? "expanded" : ""}`}
            tabIndex="0"
        >
            <Canvas onPointerMissed={() => setVentanaInfo(false)}
                camera={{ position: [1, 1.5, 7], fov: 45 }} 
                shadows={true}
                style={{ width: "100%", height: "100%" }}
                >                
                <Torso sickLevel={sickLevel} castShadow/>
                {isExpanded && (
                    <InteractiveQuestionMark 
                    VentanaInfo={VentanaInfo} 
                    setVentanaInfo={setVentanaInfo} 
                    />
                )}
                
                <Staging/>
            </Canvas>

            <button className="expand-button" onClick={() => setIsExpanded(prev => !prev)}>
                {isExpanded ? "Cerrar vista" : "Expandir"}
            </button>

            {isExpanded && (
                <div className="extra-panel">
                    <h2>Desliza y compara</h2>
                    <p>Usa la ruedita del ratón o las flechas 🠉  🠋 para explorar cómo evolucionan la ictericia y la ascitis en el torso.</p>
                </div>
            )}
        </div>
    )
}

export default Modelo2