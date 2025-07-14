import { Html } from '@react-three/drei'
import './TextoCanva.css'

const TextoCanva = ({ contenido, position, distanceFactor, visible, fuente, ancho }) => {
    if (!visible) return null;

    return (
        <Html
            distanceFactor={distanceFactor}
            position={position}
        >
            <div className="VentanaInformacion" style={{ 
                width: ancho
            }}>            
                <p style={{ fontSize: fuente }}>{contenido}</p>
            </div>
        </Html>
    )
}

export default TextoCanva