import { RigidBody } from "@react-three/rapier";
import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";
import { Text } from "@react-three/drei";

const Target = ({
  position = [0, 1, -5],
  ballRef,
  answerText = "Opciones",
  res = Boolean,
  resIndex = 0,
  questionIndex,
  onAnswered,

  disabled = false,
}) => {
  const [hit, setHit] = useState(false);
  const [hover, setHover] = useState(false);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    setAnswered(false);
    setHit(false);
  }, [questionIndex]);

  const handleClick = (e) => {
    e.stopPropagation();
    if (answered || disabled) return;

    console.log("Target clickeado en posición:", position);

    if (ballRef.current && ballRef.current.shootBall) {
      ballRef.current.shootBall({
        x: position[0],
        y: position[1],
        z: position[2],
      });
    } else {
      console.error("ballRef no disponible");
    }
  };

  const validateAnswer = async () => {
    if (answered || disabled) return;
    console.log("Validando respuesta...");
    setAnswered(true);
    setHit(true);
    if (res) {
      console.log("Respuesta correcta");
    } else {
      console.log("Respuesta incorrecta");
    }
    if (onAnswered) {
      console.log("Llamando a onAnswered con:", resIndex, res);
      onAnswered(resIndex, res);
    }
  };

  const getColor = () => {
    if (answered) {
      console.log("Respuesta ya respondida, color");
      return res ? "#4CAF50" : "#ff3c00";
    }
    if (disabled) {
      console.log("Target deshabilitado, color gris");
      return "#B1B6C8";
    }
    return "#404A6E";
  };

  return (
    <RigidBody
      type="fixed"
      colliders="cuboid"
      name="target"
      onCollisionEnter={() => validateAnswer()}
      onCollisionExit={() => setHit(false)}
    >
      <mesh
        position={position}
        castShadow
        onPointerEnter={() => !disabled && setHover(true)}
        onPointerLeave={() => setHover(false)}
        onClick={handleClick}
        scale={hover ? 1.1 : 1}
      >
        <cylinderGeometry args={[0.9, 0.9, 0.3, 30]} />
        <meshStandardMaterial
          color={getColor()}
          roughness={hover ? 0.1 : 0.3}
          metalness={hover ? 0.3 : 0.1}
          emissive={hover ? "#111" : "#000"}
        />
        {/* <Html position={position} transform>
          <div
            style={{
              borderRadius: "6px",
              padding: "6px 10px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              width: "150px",
              color: "#333",
              boxShadow: "0 2px 6px rgba(175,190,243,0.5)",
              opacity: disabled ? 0.5 : 1,
              marginBottom: "70px",
              zIndex: -1,
            }}
          >
            {answerText}
          </div>
        </Html> */}
      </mesh>
      <Text
        position={[position[0], position[1] + 1, position[2]]}
        fontSize={0.3}
        maxWidth={2}
        lineHeight={1.4}
        letterSpacing={0.12}
        textAlign="center"
        font="/fonts/unicorn.ttf"
        anchorX="center"
        anchorY="middle"
        color={disabled ? "#666" : "#fff"}
        outlineWidth={0.01}
        outlineColor="#0d1533"
      >
        {answerText}
      </Text>
    </RigidBody>
  );
};

export default Target;
