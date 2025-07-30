import { Environment, OrbitControls } from "@react-three/drei";

const Staging = () => {
    return (
        <>   {/*
        
            <Environment 
                files = {"imagenes/lilienstein_1k.hdr"}
                background
                ground={{
                    height: 10,
                    radius: 100,
                    scale: 50,
                }}
                rotation={[0, Math.PI, 0]}
            />
            
            */}
            <Environment preset="city" />
            <OrbitControls 
                enableZoom={true} 
                target={[0, 3, 0]}
                minDistance={5}
                maxDistance={17}
                />
        </>
        
    );
}

export default Staging