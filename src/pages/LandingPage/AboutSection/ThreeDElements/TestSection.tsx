import { Canvas } from '@react-three/fiber'
import { Environment, Center } from '@react-three/drei'

import CameraRig from './CameraRig'
import { FC } from 'react'
import ThreeDImages from './ThreeDImages'

const CanvasModel: FC = () => {
  return (
    <div style={{ height: '100vh', backgroundColor: 'red' }}>
      <Canvas
        camera={{ position: [0, 0, 0], fov: 25 }}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight intensity={0.5} />
        <Environment preset='city' />

        <CameraRig>
          <ThreeDImages />
        </CameraRig>
      </Canvas>
    </div>
  )
}

export default CanvasModel
