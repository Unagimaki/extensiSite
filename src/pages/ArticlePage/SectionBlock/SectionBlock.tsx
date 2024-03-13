import cn from 'classnames'
import { FC } from 'react'
import s from './section.module.scss'
import { Section } from 'shared/types/article'

interface SectionBlockProps {
  classNames?: string
  section: Section
}

export const SectionBlock: FC<SectionBlockProps> = ({
  classNames,
  section,
}) => {
  return (
    <section className={cn(s.sectionBlock, classNames)}>
      <div className={s.container}>
        <div className={s.sectionItem}>
          <div className={s.content}>
            <p className={s.title}>{section.title}</p>
            <p className={s.text}>{section.text}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
