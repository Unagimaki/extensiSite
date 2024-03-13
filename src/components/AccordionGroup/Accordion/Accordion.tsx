import { FC } from 'react'
import cn from 'classnames'

import { Icon } from './Icon'

import { Data } from '../AccordionGroup'

import s from './accordion.module.scss'

interface AccordionProps extends Data {
  opened: boolean
  withIcon?: boolean
  onSelected: () => void
}

export const Accordion: FC<AccordionProps> = ({
  title,
  content,
  opened,
  withIcon = true,
  onSelected,
}) => {
  return (
    <div
      className={cn(s.accordion, {
        [s.accordionOpened]: opened,
      })}
    >
      <button className={s.title} onClick={onSelected}>
        <div>{title}</div>
        {withIcon ? <Icon opened={opened} /> : null}
      </button>

      <div className={s.contentWrap}>
        <div className={s.content}>{content}</div>
      </div>
    </div>
  )
}
