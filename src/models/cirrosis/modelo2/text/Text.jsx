import { Text3D, Html } from '@react-three/drei';
import TextoCanva from '../../textoCanva/TextoCanva'

const InteractiveQuestionMark = ({ VentanaInfo, setVentanaInfo }) => {
  return (
    <Text3D
      font="/fonts/RobotoLight.json"
      size={0.2}
      height={0.006}
      bevelEnabled
      bevelThickness={0.02}
      bevelSize={0.01}      
      position={[0.8, -1.4, -0.6]}
      rotation={[0, Math.PI / 5, 0]} 
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
          contenido="La ictericia (piel amarilla) ocurre cuando el hígado dañado no puede procesar la bilirrubina. La ascitis (líquido en el abdomen) surge por hipertensión portal y baja albúmina. Ambas empeoran a medida que la cirrosis avanza, reflejando el deterioro hepático."
          position={[0.5, 2, 0.6]}
          distanceFactor={0.8}
          fuente='16vh'
          ancho='150vw'
        />
      )}
    </Text3D>
  );
};

export default InteractiveQuestionMark;