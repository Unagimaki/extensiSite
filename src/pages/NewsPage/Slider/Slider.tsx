/* eslint-disable react/display-name */
import React, { FC, memo } from 'react'

import s from '../newsPage.module.scss'

import Link from 'next/link'

import { News } from 'shared/types/news'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'

import cn from 'classnames'

interface SliderProps {
  data: News[] | null
  className?: string
}

const Slider: FC<SliderProps> = memo(({ data, className }) => {
  if (!data) {
    return <></>
  }
  return (
    <Swiper
      slidesPerView={1}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
      pagination={{
        clickable: true,
      }}
      className={cn(s.newsSlider, className)}
    >
      {data?.map(item => (
        <SwiperSlide className={s.newsSliderSlide} key={item.id}>
          <Link href={`/news/${item.id}`}>
            <div className={cn(s.newsBlock, s.newsSliderItem)}>
              <div className={s.newsTitle}>{item.title}</div>
              <div className={s.newsSubtitle}>{item.subtitle}</div>
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  )
})

export default Slider
