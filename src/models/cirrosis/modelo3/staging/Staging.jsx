import { Environment, OrbitControls, Shadow } from "@react-three/drei";
import { ContactShadows } from '@react-three/drei'
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

            <directionalLight
                position={[5, 8, 3]}
                intensity={0.8}
                castShadow
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-radius={10}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
                shadow-camera-near={0.5}
                shadow-camera-far={20}
            />
        </>
        
    );
}

export default Staging