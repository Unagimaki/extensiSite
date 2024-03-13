/* eslint-disable jsx-a11y/alt-text */

import * as THREE from 'three'
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'

import { Center, Image, Text } from '@react-three/drei'
import { useAppSelector } from 'shared/hooks/redux'
import { Gallery } from 'shared/types/gallery'

import getUuid from 'uuid-by-string'
import { useFrame } from '@react-three/fiber'

import { easing } from 'maath'
import { getPositionAndRotation, splitArray } from './galleryHelpers'

interface FrameProps {
  url: string[]
  c?: any
  index: number
  gallery: Gallery[]
}

const GOLDENRATIO = 1.61803398875

const Frame: FC<FrameProps> = memo(
  ({ url, c = new THREE.Color(), gallery, index }) => {
    const defaults = [0.25, 0.3, 0.15, 0.35, 0.5, 0.25, 0.3, 0.15]

    const image = useRef<any>(null)
    const frame = useRef<any>(null)

    const galleryDatas = useAppSelector(state => state.gallery)
    const [rotation, setRotation] = useState<[number, number, number]>([
      0, 0, 0,
    ])
    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
    const [clicked, setClicked] = useState(false)
    const [rnd] = useState(() => Math.random())
    const [defaultRandom] = useState<number>(
      defaults[Math.floor(Math.random() * defaults.length)]
    )

    const currentImage = url?.[currentImageIndex]

    const name = getUuid(`${gallery?.[index]?.id}`)
    const isActive = galleryDatas.id === name
    const text = gallery?.[index - 1]?.name

    const rotationFunc = useCallback(() => {
      if (!isActive || !clicked) {
        return setRotation(() => [0, 0, 0])
      }
      if (clicked && rotation[1] > -2.99) {
        setRotation(() => [0, rotation[1] - 0.08, 0])
      }
    }, [clicked, isActive, rotation])

    useFrame((state, dt) => {
      if (image.current) {
        image.current.material.zoom =
          2 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        easing.damp3(image?.current?.scale, [0.85, 0.9, 1], 0.1, dt)
        rotationFunc()
      }
    })

    useEffect(() => {
      const func = () => {
        if (!isActive) {
          return setClicked(() => false)
        }
        return setRotation(() => [0, 0, 0])
      }
      return () => func()
    }, [isActive, setClicked, clicked])

    const { left, center, right } = splitArray(gallery)

    return (
      <group
        position={
          getPositionAndRotation(index, { center, left, right }, defaultRandom)
            ?.position
        }
        rotation={
          getPositionAndRotation(index, { center, left, right }, defaultRandom)
            ?.rotation
        }
      >
        <mesh
          name={name}
          onPointerEnter={e => {
            e.stopPropagation()
            if (isActive) {
              if (currentImageIndex !== url.length - 1) {
                return setCurrentImageIndex(() => 1)
              }
              return setCurrentImageIndex(() => 0)
            }
          }}
          onPointerDown={() => {
            if (isActive) {
              setClicked(() => true)
            }
          }}
          onPointerOut={() => {
            setCurrentImageIndex(() => 0)
            if (!isActive) {
              setClicked(() => false)
            }
          }}
          scale={[1, GOLDENRATIO, 0.05]}
          rotation={rotation}
          position={[0, GOLDENRATIO / 2, 0]}
        >
          <boxGeometry />
          <meshStandardMaterial
            color='#151515'
            metalness={0.5}
            roughness={0.5}
            envMapIntensity={2}
          />
          <mesh
            ref={frame}
            raycast={() => null}
            scale={[0.9, 0.93, 0.9]}
            position={[0, 0, 0.2]}
          >
            <boxGeometry />
            <meshBasicMaterial toneMapped={false} fog={false} />
          </mesh>
          <Center position={[-0.5, 0.45, -1]}>
            <Text rotation={[0, -3, 0]} color='white' fontSize={0.075}>
              {text}
            </Text>
          </Center>
          <Image
            raycast={() => null}
            ref={image}
            position={[0, 0, 0.7]}
            url={currentImage}
          />
        </mesh>
      </group>
    )
  }
)

Frame.displayName = 'Frame'

export default Frame
