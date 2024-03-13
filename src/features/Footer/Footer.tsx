import { FC } from 'react'
import cn from 'classnames'

import s from './footer.module.scss'
import Link from 'next/link'
import Union from '/public/assets/icons/union.svg'

export interface FooterProps {
  classNames?: string
  variant?: 'black' | 'orange'
}

export const Footer: FC<FooterProps> = ({ classNames, variant = 'black' }) => {
  return (
    <footer className={cn(s.footer, s[variant], classNames)}>
      <div className={cn(s.container, classNames)}>
        <div className={cn(s.leftBlock, classNames)}>
          <p>Email us at</p>
          <Link href={'mailto: info@tcollection.art'}>
            info@tcollection.art
          </Link>
        </div>
        <div className={s.rightBlock}>
          <Union />
        </div>
      </div>
    </footer>
  )
}
