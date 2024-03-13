/* eslint-disable react/display-name */
import React, { Ref, useRef } from 'react'
import { useGLTF, useProgress } from '@react-three/drei'

interface ThreeDImagesProps {
  rotation?: [number, number, number]
  position?: [number, number, number]
  scale?: number
  gltfPath?: string
}

const ThreeDImages: React.FC<ThreeDImagesProps> = ({
  rotation = [-0.6, 0.2, 0.2],
  position = [-1, 0, -0.01],
  gltfPath,
  scale = 1,
}) => {
  const pic: any = useGLTF(`/${gltfPath}`)


  return (
    <group position={position} rotation={rotation} dispose={null}>
      <mesh
        material-roughness={1}
        scale={scale}
        material={Object.values(pic.materials)[0] as any}
        geometry={pic.nodes['it2000-mc192_flippedobj'].geometry}
      ></mesh>
    </group>
  )
}

export default ThreeDImages
