import React, { FC, PropsWithChildren, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { easing } from 'maath'

import { Object3DEventMap, Group } from 'three'


interface CameraRigProps extends PropsWithChildren {
  targetPosition?: [number, number, number]
}

const CameraRig: FC<CameraRigProps> = ({
  children,
  targetPosition = [-1, 0, 2],
}) => {
  const group = useRef<Group<Object3DEventMap>>(null)

  useFrame((state, delta) => {
    // set model camera position
    easing.damp3(state.camera.position, targetPosition, 0.25, delta)

    // set the model rotation smoothly
    if (group.current) {
      easing.dampE(
        group.current.position as any,
        [state.pointer.x / 10, state.pointer.y / 10, 0],
        0.35,
        delta
      )
      easing.dampE(
        group.current.rotation,
        [-(state.pointer.y / 15), state.pointer.x / 15, 0],
        0.35,
        delta
      )
    }
  })

  return <group ref={group}>{children}</group>
}

export default CameraRig
