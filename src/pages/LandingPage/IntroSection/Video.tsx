import { FC, useEffect, useMemo, useRef } from 'react'
import s from './introSection.module.scss'
import useViewportSizes from 'use-viewport-sizes'

import DesktopPoster from '../../../../public/images/introsection_desktop_poster.png'
import MobilePoster from '../../../../public/images/introsection_mobile_poster.png'

const Video: FC = () => {
  const [width] = useViewportSizes({ dimension: 'w' })
  const videoRef = useRef<HTMLVideoElement>(null)

  const videoUrl = useMemo(() => {
    if (width >= 768) {
      return {
        variant: 'desktop',
        url: '/videos/introsectionvid_desktop.mp4',
      }
    }
    return {
      variant: 'mobile',
      url: '/videos/introsectionvid_mobile.mp4',
    }
  }, [width])

  return (
    <video
      autoPlay
      muted
      className={s.video}
      loop
      poster={
        videoUrl.variant == 'desktop' ? DesktopPoster.src : MobilePoster.src
      }
      controls={false}
      playsInline
      ref={videoRef}
      onCanPlayThrough={() => {
        console.log('can play')
        videoRef.current?.play()
      }}
    >
      <source src={videoUrl.url} />
    </video>
  )
}

export default Video
