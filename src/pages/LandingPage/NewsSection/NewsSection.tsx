import { FC, useState } from 'react'

import { useRouter } from 'next/router'
import cn from 'classnames'

import { Button } from 'components'

import Pic1 from '../../../../public/assets/icons/News1.svg'
import Pic2 from '../../../../public/assets/icons/News2.svg'

import s from './newsSection.module.scss'

import { News } from 'shared/types/news'
import Link from 'next/link'

import useEmblaCarousel from 'embla-carousel-react'
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions'
import Image from 'next/image'

interface NewsSectionProps {
  news: News[]
}

export const NewsSection: FC<NewsSectionProps> = ({ news }) => {
  const router = useRouter()
  const { width: windowWidth } = useWindowDimensions()
  const [showTooltip, setShowTooltip] = useState(false)
  const [tooltipContent, setTooltipContent] = useState<string>('')
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    slidesToScroll: 1,
    containScroll: 'trimSnaps',
    draggable: true,
    breakpoints: {
      '(min-width: 768px)': { draggable: false },
    },
  })
  const CAROUSEL_NEWS = news.slice(1, -1)

  const onClick = () => {
    router.push('./news')
  }

  const handleMouseEnter = (imageComponentName: string) => {
    setTooltipContent(imageComponentName)
    setShowTooltip(true)
  }

  const handleMouseLeave = () => {
    setShowTooltip(false)
  }
  const onClickNews = (id: number) => {
    router.push(`./news/${id}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.titleWrapper}>
          <h1 className={s.title}>News</h1>
        </div>
        <div className={s.gridNews}>
          <div className={cn(s.newsTop, s.newsItem)}>
            <div
              className={s.image1}
              onMouseEnter={() => handleMouseEnter('image1')}
              onMouseLeave={handleMouseLeave}
            >
              {showTooltip && tooltipContent == 'image1' ? (
                <div className={s.tooltipImage}>
                  <Image
                    src={news[0].image}
                    alt='news image'
                    width={462}
                    height={281}
                  />
                </div>
              ) : (
                <Pic1 />
              )}
            </div>
            <Link href={`./news/${news[0].id}`}>
              <div className={s.newsBlock}>
                <div className={s.newsTitle}>{news[0].title}</div>
                <div className={s.newsSubtitle}>{news[0].subtitle}</div>
              </div>
            </Link>
          </div>

          <div className={s.slider}>
            <div className={s.newsSliderViewport} ref={emblaRef}>
              <div className={s.newsSlider}>
                {CAROUSEL_NEWS?.map((item, index) => (
                  <div
                    className={s.newSliderItem}
                    onClick={() => {
                      if (windowWidth <= 768) return
                      if (index === emblaApi?.slidesInView(true)[0]) {
                        emblaApi?.scrollTo(index - 1)
                        return
                      }
                      emblaApi?.scrollTo(index)
                    }}
                    key={index}
                  >
                    <div onClick={() => onClickNews(item.id)}>
                      <h3 className={s.newsTitle}>{item.title}</h3>
                      <p className={s.newsSubtitle}>{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className={cn(s.newsBottom, s.newsItem)}>
            <div
              className={s.image2}
              onMouseEnter={() => handleMouseEnter('image2')}
              onMouseLeave={handleMouseLeave}
            >
              {showTooltip && tooltipContent == 'image2' ? (
                <div className={s.tooltipImage2}>
                  <Image
                    src={news?.at(-1)?.image!}
                    alt='news image'
                    width={462}
                    height={281}
                  />
                </div>
              ) : (
                <Pic2 />
              )}
            </div>
            <Link href={`./news/${news?.at(-1)?.id!}`}>
              <div className={s.newsBlock}>
                <div className={s.newsTitle}>{news?.at(-1)?.title}</div>
                <div className={s.newsSubtitle}>{news?.at(-1)?.subtitle}</div>
              </div>
            </Link>
          </div>
        </div>
        <div className={s.buttonBlock}>
          <Button onClick={onClick} withArrowIcon />
        </div>
      </div>
    </div>
  )
}
