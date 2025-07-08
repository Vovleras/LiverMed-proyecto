import { useEffect } from "react";
import { useKeyboardControls } from "@react-three/drei";

const KeyboardController = ({ setIsAnimating }) => {
  const pressed = useKeyboardControls((state) => state.animation);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === "KeyS") {
        setIsAnimating((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setIsAnimating]);

  return null;
};
export default KeyboardController;
