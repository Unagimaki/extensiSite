import {
  Dispatch,
  FC,
  SetStateAction,
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react'
import cn from 'classnames'

import s from './aboutSection.module.scss'
import { Canvas } from '@react-three/fiber'
import { Environment, Preload, useProgress } from '@react-three/drei'
import CameraRig from './ThreeDElements/CameraRig'
import ThreeDImages from './ThreeDElements/ThreeDImages'
import { Button } from 'components'
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions'

import Pic1 from '../../../../public/images/about-pic1.png'
import Pic2 from '../../../../public/images/about-pic2.png'
import Pic3 from '../../../../public/images/about-pic3.png'
import Image from 'next/image'

export interface AboutSectionProps {
  classNames?: string
  setIsDescriptionHidden: Dispatch<SetStateAction<boolean>>
  isDescriptionHidden: boolean
}

const CanvasLoader: FC<{
  onChangeProgress?: (progress: number, item: string) => void
}> = ({ onChangeProgress }) => {
  const { item, progress } = useProgress()
  useEffect(() => {
    onChangeProgress?.(progress, item)
  }, [item, progress])
  return <></>
}

export const AboutSection: FC<AboutSectionProps> = ({
  classNames,
  setIsDescriptionHidden,
  isDescriptionHidden,
}) => {
  const { width: windowWidth } = useWindowDimensions()
  const [isModelsLoaded, setIsModelsLoaded] = useState(false)
  const sectionRef = useRef<HTMLElement>()
  return (
    <div className={cn(s.aboutSection, classNames)}>
      <div className={s.canvas}>
        <Canvas
          camera={{ position: [0, 0, 0], fov: 100 }}
          className={s.canvas}
          gl={{ preserveDrawingBuffer: false }}
          eventSource={sectionRef?.current}
          eventPrefix='client'
        >
          <Suspense
            fallback={
              <CanvasLoader
                onChangeProgress={(progress, item) => {
                  if (progress >= 80) {
                    setIsModelsLoaded(() => true)
                  }
                }}
              />
            }
          >
            <CameraRig targetPosition={[-1, 0, 2]}>
              <ThreeDImages
                gltfPath='3d_about_pic1.glb'
                position={
                  windowWidth >= 768 ? [-0.2, 0.8, -0.2] : [0.2, 2, -0.2]
                }
                rotation={[-0.1, 0, -0.1]}
              />
              <ThreeDImages
                gltfPath='3d_about_pic2.gltf'
                position={
                  windowWidth >= 768 ? [-2.3, -1.5, -1] : [-2, 0.3, -1.5]
                }
                rotation={[0, 0, 0.2]}
              />
              <ThreeDImages
                gltfPath='3d_about_pic3.glb'
                position={
                  windowWidth >= 768 ? [-0.3, -1.1, 0.2] : [-0.3, -0.4, 0.2]
                }
                rotation={[0, 0, 0.2]}
              />
            </CameraRig>
            <Environment preset='city' />
            <Preload all />
          </Suspense>
        </Canvas>
      </div>
      <div className={s.container}>
        <h1>About</h1>
        {!isModelsLoaded ? (
          <div className={s.pictures}>
            <div className={s.pic1}>
              <Image
                src={Pic1}
                alt='About picture 1'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <div className={s.pic2}>
              <Image
                src={Pic2}
                alt='About picture 2'
                layout='fill'
                objectFit='contain'
              />
            </div>
            <div className={s.pic3}>
              <Image
                src={Pic3}
                alt='About picture 3'
                layout='fill'
                objectFit='contain'
              />
            </div>
          </div>
        ) : null}
        <div className={s.blockText}>
          <p className={s.ml1}>Мы</p>
          <p className={s.ml}>
            <span>рекламное</span>
            <span className={cn(s.spanMr1, s.zIndex)}>бутик-агенство </span>
            <span className={s.zIndex}>&nbsp; и студия</span>
          </p>
          <p className={s.ml}>
            <span className={cn(s.spanMr2, s.zIndex)}>разработки</span>
            <span className={s.ex}>&nbsp; которая</span>
          </p>
          <p className={s.ml2}>создает и реализует</p>
          <p className={s.ml3}>
            <span className={cn(s.spanMr3, s.zIndex)}>яркие и действенные проекты</span>{' '}
          </p>
          <p className={s.ml4}>и механики</p>
          <p className={cn(s.ml5, s.zIndex)}>направленные</p>
          <p className={cn(s.ml6, s.zIndex)}>на</p>
          <p className={s.ml7}>результат</p>
        </div>
        <div
          className={cn(s.toggleButton, !isDescriptionHidden ? s.hidden : null)}
        >
          <Button
            variant='black'
            classNames={s.button}
            onClick={() => setIsDescriptionHidden(() => false)}
          />
        </div>
      </div>
    </div>
  )
}
