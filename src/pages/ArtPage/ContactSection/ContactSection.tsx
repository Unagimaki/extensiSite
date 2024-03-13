import { FC } from 'react'

import Vimosh from '../../../../public/images/vimosh.png'

import s from './contactSection.module.scss'

import cn from 'classnames'

import { Button, Input } from 'components'
import Image from 'next/image'

export const ContactSection: FC = () => {
  return (
    <section className={s.contactSection}>
      <div className={s.container}>
        <div className={s.header}>
          <h2 className={cn(s.text, s.textTop)}>
            For <span className={s.zIndex}>art vernissage</span> enquiries
          </h2>
          <h2 className={cn(s.text, s.textBottom)}>
            <span className={s.marginLeftText}>leave</span>your contact details
          </h2>
          <div className={s.imageWrapper}>
            <div className={s.image}>
              <Image src={Vimosh} width={204} height={207} alt='vimosh' />
            </div>
          </div>
        </div>
        <div className={s.inputWrapper}>
          <Input className={s.input} placeholder='your email address' />
          <Button withArrowIcon variant='black' classNames={s.button} />
        </div>
      </div>
    </section>
  )
}
