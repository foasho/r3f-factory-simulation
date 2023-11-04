import { Canvas } from "@react-three/fiber";
import { OrbitControls, GizmoHelper, GizmoViewport } from "@react-three/drei";
import { Factory } from "./Factory";
import { Vector3 } from "three";

function App() {
  return (
    <div style={{ height: "100dvh", width: "100dvw" }}>
      <Canvas shadows camera={{position: [3, 5, 3]}}>
        <ambientLight intensity={1} />
        <pointLight position={[3, 3, 3]} castShadow/>
        <directionalLight position={[-2, 3, 5]} castShadow/>
        <hemisphereLight intensity={0.5} />
        <Factory />
        <OrbitControls makeDefault target={new Vector3(0, 2, 0)} />
        <GizmoHelper alignment="top-right" margin={[75, 75]}>
          <GizmoViewport labelColor="white" axisHeadScale={1} />
        </GizmoHelper>
      </Canvas>
    </div>
  )
}

export default App