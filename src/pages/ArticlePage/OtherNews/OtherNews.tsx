import { FC, useCallback, useMemo, useState } from 'react'
import Link from 'next/link'

import cn from 'classnames'

import { Button } from 'components'

import Pic1 from '/public/assets/icons/News1.svg'
import Pic2 from '/public/assets/icons/News2.svg'
import Pic3 from '/public/assets/icons/News3.svg'

import { News } from 'shared/types/news'

import s from './otherNews.module.scss'
import Slider from './Slider/Slider'
import { useWindowDimensions } from 'shared/hooks/useWindowDimensions'

interface NewsPageProps {
  news: News[]
}

export const OtherNews: FC<NewsPageProps> = ({ news }) => {
  const { width: viewportWidth } = useWindowDimensions()

  const NEWS_PAGE_ARTICLES_LENGTH = news.length

  const netxArticlesList = () => {
    setArticleNumber(articleNumber + NEWS_PAGE_ARTICLES_LENGTH)
  }

  const [articleNumber, setArticleNumber] = useState<number>(0)

  const getMiddle = useCallback(
    (data: News[]) => data?.[Math.floor(data.length / 2)],
    []
  )

  const { first, last, middle, othersFirstPart, othersLastPart } =
    useMemo(() => {
      const articles = {
        first: news?.[0],
        middle: getMiddle(news),
        last: news?.[news.length - 1],
      }

      const others: News[] = news.filter(
        item =>
          ![articles.first.id, articles.middle.id, articles.last.id].includes(
            item.id
          )
      )

      const othersPartIndex = others
        .map(i => i.id)
        .indexOf(getMiddle(others).id)

      return {
        ...articles,
        others,
        othersFirstPart: others.slice(0, othersPartIndex),
        othersLastPart: others.slice(othersPartIndex),
      }
    }, [news])

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.titleBlock}>
          <h1 className={s.title}>News</h1>
        </div>
        <div className={s.newsArticles}>
          <div className={cn(s.first, s.newsArticle)}>
            <div className={cn(s.image, s.image1)}>
              <Pic1 />
            </div>
            <Link key={first.id} href={`./news/${first.id}`}>
              <div className={s.newsBlock}>
                <div className={s.newsTitle}>{first.title}</div>
                <div className={s.newsSubtitle}>{first.subtitle}</div>
              </div>
            </Link>
          </div>
          <Slider data={othersFirstPart} />
          <div className={cn(s.middle, s.newsArticle)}>
            <Link key={middle.id} href={`./news/${middle.id}`}>
              <div className={s.newsBlock}>
                <div className={s.newsTitle}>{middle.title}</div>
                <div className={s.newsSubtitle}>{middle.subtitle}</div>
              </div>
            </Link>
            <div className={cn(s.image, s.image2)}>
              <Pic2 />
            </div>
          </div>
          {viewportWidth <= 768 ? <Slider data={othersLastPart} /> : null}
          <div className={cn(s.last, s.newsArticle)}>
            <div className={cn(s.image, s.image3)}>
              <Pic3 />
            </div>
            <Link key={last.id} href={`./news/${last.id}`}>
              <div className={s.newsBlock}>
                <div className={s.newsTitle}>{last.title}</div>
                <div className={s.newsSubtitle}>{last.subtitle}</div>
              </div>
            </Link>
          </div>
          {viewportWidth >= 768 ? <Slider data={othersLastPart} /> : null}
        </div>
        <div className={s.buttonBlock}>
          <Button variant='black' onClick={netxArticlesList} />
        </div>
      </div>
    </div>
  )
}
