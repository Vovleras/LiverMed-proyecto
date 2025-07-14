import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

const AdjustExposure = () => {
    const { gl } = useThree();

    useEffect(() => {
        gl.toneMappingExposure = 0.3;
    }, [gl]);

    return null;
};

export default AdjustExposure