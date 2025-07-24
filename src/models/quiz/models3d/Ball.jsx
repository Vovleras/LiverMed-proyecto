import { RigidBody } from "@react-three/rapier";
import { useRef, forwardRef, useImperativeHandle } from "react";

const Ball = forwardRef(({ position = [0, 1, 4] }, ref) => {
  const ballRef = useRef();

  const shootBall = (targetPosition) => {
    console.log("Shooting ball towards:", targetPosition);

    if (ballRef.current) {
      const ballPosition = ballRef.current.translation();
      const direction = {
        x: targetPosition.x - ballPosition.x,
        y: targetPosition.y - ballPosition.y + 1,
        z: targetPosition.z - ballPosition.z,
      };

      const magnitude = Math.sqrt(
        direction.x * direction.x +
          direction.y * direction.y +
          direction.z * direction.z
      );
      const normalizedDirection = {
        x: direction.x / magnitude,
        y: direction.y / magnitude,
        z: direction.z / magnitude,
      };

      const force = 2;
      const impulse = {
        x: normalizedDirection.x * force,
        y: normalizedDirection.y * force,
        z: normalizedDirection.z * force,
      };

      ballRef.current.applyImpulse(impulse, true);
    } else {
      console.log("Ball reference is not available");
    }
  };

  const resetBall = () => {
    if (ballRef.current) {
      ballRef.current.setTranslation(
        { x: position[0], y: position[1], z: position[2] },
        true
      );

      ballRef.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
      ballRef.current.setAngvel({ x: 0, y: 0, z: 0 }, true);
    }
  };

  useImperativeHandle(ref, () => ({
    shootBall,
    resetBall,
  }));

  return (
    <RigidBody
      type="dynamic"
      ref={ballRef}
      colliders="ball"
      restitution={0.6}
      friction={0.5}
      position={position}
    >
      <mesh castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial color="#AFBEF3" />
      </mesh>
    </RigidBody>
  );
});

Ball.displayName = "Ball";

export default Ball;
