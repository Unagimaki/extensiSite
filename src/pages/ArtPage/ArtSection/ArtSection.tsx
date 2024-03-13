import React, { FC, useState } from 'react'
import Image from 'next/image'
import s from './artSection.module.scss'
import { Art } from 'shared/types/art'
import { debounce } from 'lodash'
import Breadcrumb, { TBreadCrumb } from 'components/Breadcrumb/Breadcrumb'

interface ArtSectionProps {
  art: Art
}

export const ArtSection: FC<ArtSectionProps> = ({ art }) => {
  const [showImages, setShowImages] = useState(false)

  const [imagesLocation, setImagesLocation] = useState<
    { x: number; y: number }[]
  >([{ x: 0, y: 0 }])

  const BREADCRUMB_PATHS: TBreadCrumb[] = [
    { href: '/', title: 'Main' },
    { href: '/shop', title: 'Shop' },
    { href: `/shop/${art.id}`, title: art.name, active: true },
  ]

  const handleMouseMove =
    (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (imagesLocation.length < 12) {
        setImagesLocation(prevImagesLocation => [
          ...prevImagesLocation,
          { x: e.clientX, y: e.clientY },
        ])
      } else {
        imagesLocation.shift()
      }
    }

  const handleMouseEnter = () => {
    setShowImages(true)
  }

  const handleMouseLeave = () => {
    setShowImages(false)
    setImagesLocation([{ x: 0, y: 0 }])
  }

  return (
    <div className={s.artSection}>
      <div className={s.header}>
        <div className={s.headerContainer}>
          <h1 className={s.title}>Shop</h1>
          <Breadcrumb data={BREADCRUMB_PATHS} disableVariant='gray' />
        </div>
      </div>
      <div className={s.container}>
        <div className={s.leftSideContainer}>
          <div className={s.imageWrapper}>
            <Image
              src={art?.image}
              alt='artImage'
              layout='fill'
              objectFit='contain'
            />
          </div>
          <div className={s.textContainer}>
            <div className={s.poster}>Poster</div>
            <div className={s.artist}>
              <span>Artist:</span>
              <h2 className={s.name}>{art?.name}</h2>
            </div>
            <div className={s.price}>{art?.price}$</div>
          </div>
        </div>
        <div className={s.verticalLine}></div>
        <div
          className={s.multipieImages}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className={s.mainImage}>
            {showImages ? '' : <Image
              src={art?.image}
              alt={art?.name}
              layout='fill'
              objectFit='contain'
            />}
          </div>
          <div>
            {showImages &&
              imagesLocation.map((el, index) => {
                return (
                  <div
                    key={index}
                    className={s.animateImages}
                    style={{ left: el.x - 800, top: el.y - 250 }}
                  >
                    <Image
                      src={art?.image}
                      alt={art?.name}
                      layout='fill'
                      objectFit='contain'
                    />
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </div>
  )
}
