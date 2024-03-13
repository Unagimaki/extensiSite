import { FC } from 'react'
import cn from 'classnames'

import s from './icon.module.scss'

export interface IconProps {
  opened: boolean
}

export const Icon: FC<IconProps> = ({ opened }) => {
  // add you icon here
  return <div className={cn(s.icon, { [s.iconOpened]: opened })}>&#9660;</div>
}
