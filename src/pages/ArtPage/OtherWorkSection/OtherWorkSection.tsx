import { FC, useEffect, useRef, useState } from 'react'
import Image from 'next/image'

import { Art } from 'shared/types/art'

import s from './otherWorkSection.module.scss'

import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

// import required modules
import { FreeMode } from 'swiper/modules'

import { useRouter } from 'next/router'

interface OtherWorkSectionProps {
  art: Art[]
}

export const OtherWorkSection: FC<OtherWorkSectionProps> = ({ art }) => {
  const router = useRouter()
  return (
    <div className={s.wrapper}>
      <div className={s.contentBlock}>
        <h2 className={s.title}>Other works</h2>
        <div className={s.slider}>
          <Swiper
            slidesPerView={8}
            spaceBetween={8}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            modules={[FreeMode]}
            className={s.slides}
          >
            {art?.map(item => (
              <SwiperSlide
                key={item.id}
                className={s.picture}
                onClick={() => router.push(`/shop/${item.id}`)}
              >
                <Image
                  src={item?.image}
                  alt={item?.artist}
                  width={0}
                  height={0}
                  sizes='100vw'
                  objectFit='cover'
                  style={{ width: '100%', height: 'auto' }}
                ></Image>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  )
}
