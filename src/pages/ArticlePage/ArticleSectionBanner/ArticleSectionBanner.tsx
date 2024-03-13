import cn from 'classnames'
import { FC } from 'react'
import s from './articleSectionBanner.module.scss'
import { Article } from 'shared/types/article'
import Image from 'next/image'
import Breadcrumb from 'components/Breadcrumb/Breadcrumb'
interface ArticleSectionBannerProps {
  classNames?: string
  article: Article
}

export const ArticleSectionBanner: FC<ArticleSectionBannerProps> = ({
  classNames,
  article,
}) => {
  const { title, topic, bg_image, date } = article
  const arrayTitles = title?.split(' ')
  const centerLineText = arrayTitles?.filter((text, ind) => {
    return ind !== 0 && ind !== arrayTitles.length - 1 ? text : null
  })

  return (
    <section className={cn(s.articleSectionBanner, classNames)}>
      <div className={s.breadcrumbs}>
        <Breadcrumb
          data={[
            {
              href: '/',
              title: 'Main',
            },
            {
              href: '/news',
              title: 'News',
            },
            {
              href: '/',
              title,
              active: true,
            },
          ]}
        />
      </div>
      <div className={s.container}>
        <Image
          className={s.articleBanner}
          width={1232.03}
          height={594.77}
          src={bg_image}
          alt='banner'
        />
        <p className={s.topic}>{topic}</p>
        <p className={s.date}>{date}</p>
        <h2 className={s.title}>
          <span>{arrayTitles[0]}</span>
          <span>{centerLineText.join(' ')}</span>
          <span>{arrayTitles[arrayTitles.length - 1]}</span>
        </h2>
      </div>
    </section>
  )
}
