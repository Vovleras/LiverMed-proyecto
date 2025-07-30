import { Environment, OrbitControls, Shadow } from "@react-three/drei";
import Piso from './Piso'

const Staging = () => {
    return (
        <>
            <Environment 
                files = {"/models-3d/models-cirrosis/staging/hdris/hospital_room_1k.hdr"}
                background
                ground={{
                    height: 50,
                    radius: 60,
                    scale: 40,
                }}
            />
            <OrbitControls 
                enableZoom={true} 
                target={[0, 2, 0]}
                minDistance={5}
                maxDistance={17}
                />

            <Piso/>
        </>
        
    );
}

export default Staging