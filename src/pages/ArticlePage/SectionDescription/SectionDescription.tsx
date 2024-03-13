import cn from 'classnames'
import { FC } from 'react'
import s from './sectionDescription.module.scss'
import { Article } from 'shared/types/article'

interface SectionDescriptionProps {
  classNames?: string
  article: Article
}

export const SectionDescription: FC<SectionDescriptionProps> = ({
  classNames,
  article,
}) => {
  const { descriptionText } = article
  return (
    <section className={cn(s.sectionDescription, classNames)}>
      <div className={s.container}>
        {descriptionText?.map((text, ind) => {
          return (
            <p className={s.text} key={ind}>
              {text.text}
            </p>
          )
        })}
      </div>
    </section>
  )
}
