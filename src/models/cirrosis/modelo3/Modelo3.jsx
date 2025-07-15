import { Canvas } from '@react-three/fiber';
import { useState } from 'react';
import Medicinas from './models-3d/Medicinas';
import Staging from './staging/Staging';
import TextoCanva from '../textoCanva/TextoCanva';
import './Modelo3.css';

export default function Modelo1() {
  const [ventanaInfo, setVentanaInfo] = useState(false);

  return (
    <div className="modelo3-cirrosis" tabIndex="0">
      <Canvas
        shadows
        camera={{ position: [-7, 4, -6], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Medicinas
          onClick={(e) => {
            e.stopPropagation();
            setVentanaInfo(!ventanaInfo);
          }}
          onPointerOver={(e) => {
            document.body.style.cursor = 'pointer';
            e.stopPropagation();
          }}
          onPointerOut={(e) => {
            document.body.style.cursor = 'default';
            e.stopPropagation();
          }}
        />
        <Staging />
        {ventanaInfo && (
          <TextoCanva
            visible={ventanaInfo}
            contenido="Estos tratamientos son solo ilustrativos. Antes de usarlos, consulta a un profesional de la salud."
            position={[0, 3, 0]}
            distanceFactor={0.8}
            fuente="18vh"
            ancho="120vw"
          />
        )}
      </Canvas>
    </div>
  );
}
