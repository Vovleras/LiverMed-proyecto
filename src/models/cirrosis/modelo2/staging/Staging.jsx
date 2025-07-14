import AdjustExposure from './AdjustExposure'
import { Environment, OrbitControls, Shadow } from "@react-three/drei";
import { ContactShadows } from '@react-three/drei'

const Staging = () => {
    return (
        <>
            <Environment 
                files = {"/models-3d/models-cirrosis/staging/hdris/brown_photostudio.hdr"}
                background
            />
            
            <AdjustExposure />
            <OrbitControls enableZoom={false} />

            <directionalLight
                position={[5, 7, 5]}
                intensity={0.7}
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

            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -4.01, 0]}
                receiveShadow
                >
                <planeGeometry args={[50, 50]} />
                <shadowMaterial opacity={0.15} />
            </mesh>
        </>
        
    );
}

export default Staging