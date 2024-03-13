import { FC } from 'react'
import { Article } from 'shared/types/article'
import s from './articlePage.module.scss'
import { ArticleSectionBanner } from './ArticleSectionBanner/ArticleSectionBanner'
import { SectionDescription } from './SectionDescription/SectionDescription'
import { SectionBlock } from './SectionBlock/SectionBlock'
import { QuoteNewsSection } from './QuoteSection/QuoteNewsSection'
import { OtherNewsSection } from './OtherNewsSection/OtherNewsSection'

interface ArticlePageProps {
  article: Article
}

export const ArticlePage: FC<ArticlePageProps> = ({ article }) => {
  const { sections } = article
  return (
    <div className={s.articlePage}>
      <div className={s.wrapperBlocks}>
        <ArticleSectionBanner article={article} />
        <SectionDescription article={article} />
        {sections.map((section, ind) => {
          return <SectionBlock key={ind} section={section} />
        })}
      </div>
      <QuoteNewsSection article={article} />
      <OtherNewsSection news={article}/>
    </div>
  )
}
