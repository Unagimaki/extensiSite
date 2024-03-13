import React, { FC } from 'react'
import cn from 'classnames'
import Link from 'next/link'

import s from './introSection.module.scss'
import Video from './Video'

export interface IntroSectionProps {
  classNames?: string
}

export const IntroSection: FC<IntroSectionProps> = ({ classNames }) => {
  return (
    <div className={cn(s.introSection, classNames)}>
      <div className={s.videoWrapper}>
        <Video />
      </div>
      <div className={s.linkBlock}>
        <div>
          <Link href='#artistsSection'>Artists</Link>
        </div>
        <div>
          <Link href='#gallerySection'>Gallery</Link>
        </div>
      </div>
    </div>
  )
}
