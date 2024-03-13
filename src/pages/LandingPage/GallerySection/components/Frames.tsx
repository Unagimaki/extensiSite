import { QuaternionProps, Vector3Props, useFrame } from '@react-three/fiber'
import { FC, memo, useEffect, useRef } from 'react'
import { useAppDispatch, useAppSelector } from 'shared/hooks/redux'

import * as THREE from 'three'

import { easing } from 'maath'
import { Gallery } from 'shared/types/gallery'
import Frame from './Frame'
import { changeData } from 'store/slices/gallery'

import { a, useSpring, useSprings } from '@react-spring/three'

interface FramesProps {
  q?: QuaternionProps
  p?: Vector3Props
  gallery: Gallery[]
}

const GOLDENRATIO = 1.61803398875

const Frames: FC<FramesProps> = memo(
  ({ gallery, q = new THREE.Quaternion(0, 0, 0), p = new THREE.Vector3() }) => {

    console.log('images' + gallery);
    const dispatch = useAppDispatch()
    const galleryDatas = useAppSelector(state => state.gallery)
    const ref = useRef<THREE.Group<THREE.Object3DEventMap> | null>(null)
    const clicked = useRef<any>()

    const handleGalleryDatas = (values: string) => dispatch(changeData(values))

    useEffect(() => {
      clicked.current = ref?.current?.getObjectByName(galleryDatas.id)
      if (clicked.current) {
        clicked.current.parent.updateWorldMatrix(true, true)
        clicked.current.parent.localToWorld(
          (p as any).set(0, GOLDENRATIO / 2, 1.25)
        )
        clicked.current.parent.getWorldQuaternion(q)
      } else {
        ;(p.set as any)(0, 0, 5.5)
        ;(q.identity as any)()
      }
    }, [galleryDatas.id, p, q])

    useFrame((state, dt) => {
      easing.damp3(state.camera.position, p as number, 0.4, dt)
      easing.dampQ(state.camera.quaternion, q as any, 0.4, dt)
    })
    return (
      <group
        ref={ref}
        onClick={e => (e.stopPropagation(), handleGalleryDatas(e.object.name))}
        onPointerMissed={() => handleGalleryDatas('/')}
      >
        {gallery?.map(({ id, ...image }: Gallery, index: number) => (
          <Frame
            key={index}
            index={id}
            url={image.images}
            gallery={gallery}
            {...image}
          />
        ))}
      </group>
    )
  }
)

Frames.displayName = 'Frames'

export default Frames
