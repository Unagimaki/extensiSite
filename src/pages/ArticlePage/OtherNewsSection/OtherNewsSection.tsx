import { FC, WheelEvent } from 'react'
import { useRouter } from 'next/router'

import { Article } from 'shared/types/article'

import s from './otherNewsSection.module.scss'
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions'
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

interface OtherNewsSectionProps {
  news: Article
}

export const OtherNewsSection: FC<OtherNewsSectionProps> = ({ news }) => {
  const router = useRouter()
  const { width: windowWidth } = useWindowDimensions()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: false,
      align: 'start',
      containScroll: 'trimSnaps',
    },
    [
      WheelGesturesPlugin({
        forceWheelAxis: 'y',
        active: true,
      }),
    ]
  )

  const redirectToNewsPage = (id: number) => {
    router.push(`./${id}`)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.content}>
        <h2 className={s.title}>Other news</h2>
        <div
          className={s.newsWrapper}
          ref={windowWidth >= 768 ? emblaRef : null}
        >
          <div className={s.news}>
            {news?.related_posts?.map(item => (
              <div
                key={item.id}
                onClick={() => redirectToNewsPage(item.id)}
                className={s.newsBlock}
              >
                <div className={s.newsTitle}>{item.title}</div>
                <div className={s.newsSubTitle}>{item.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
