import { Text3D, Html } from '@react-three/drei';
import TextoCanva from '../../textoCanva/TextoCanva';

const InteractiveQuestionMark = ({ VentanaInfo, setVentanaInfo }) => {
  return (
    <Text3D
      font="/fonts/RobotoLight.json"
      size={0.08}
      height={0.006}
      bevelEnabled
      bevelThickness={0.01}
      bevelSize={0.006}      
      position={[0.3, 1.7, 0]}
      rotation={[0, - Math.PI / 6, 0]} 
      onClick={(e) => {
        e.stopPropagation();
        setVentanaInfo(!VentanaInfo);
      }}
      onPointerOver={(e) => {
        document.body.style.cursor = 'pointer';
        e.stopPropagation();
      }}
      onPointerOut={(e) => {
        document.body.style.cursor = 'default';
        e.stopPropagation();
      }}
    >
      ?
      <meshStandardMaterial color="#faf48a" />
      {VentanaInfo && (
        <TextoCanva
          visible={VentanaInfo}
          contenido="Dale un solo click al modelo para animarlo (evita el exceso de alcohol)"
          position={[0,-0.02,0]}
          distanceFactor={0.8}
          fuente='7vh'
          ancho='43vw'
        />
      )}
    </Text3D>
  );
};

export default InteractiveQuestionMark;