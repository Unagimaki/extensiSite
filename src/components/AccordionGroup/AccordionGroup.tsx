import { FC, useState } from 'react'
import cn from 'classnames'

import { Accordion } from './Accordion/Accordion'

import s from './accordionGroup.module.scss'

export interface Data {
  title: string
  content: string
}
interface AccordionProps {
  classnames?: string
  data: Data[]
  withIcon?: boolean
}

export const AccordionGroup: FC<AccordionProps> = ({
  data,
  withIcon,
  classnames,
}) => {
  const [opened, setOpened] = useState<number | null>(null)

  const handleSelect = (index: number) => {
    if (index === opened) return setOpened(null)
    setOpened(index)
  }

  return (
    <ul className={cn(s.accordionList, classnames)}>
      {data.map((data, index) => (
        <li key={index}>
          <Accordion
            {...data}
            opened={index === opened}
            withIcon={withIcon}
            onSelected={() => handleSelect(index)}
          />
        </li>
      ))}
    </ul>
  )
}
