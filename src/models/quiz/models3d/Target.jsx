import { RigidBody } from "@react-three/rapier";
import { useState, useEffect } from "react";
import { Html } from "@react-three/drei";

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
      return "#CCCCCC";
    }
    return "#FF5722";
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
        <boxGeometry args={[2, 1, 0.2]} />
        <meshStandardMaterial color={getColor()} />
        <Html position={position} transform>
          <div
            style={{
              background: "rgba(255,255,255,0.9)",
              borderRadius: "6px",
              padding: "6px 10px",
              textAlign: "center",
              fontSize: "14px",
              fontWeight: "bold",
              width: "150px",
              color: "#333",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
              opacity: disabled ? 0.5 : 1,
            }}
          >
            {answerText}
          </div>
        </Html>
      </mesh>
    </RigidBody>
  );
};

export default Target;
