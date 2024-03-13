import {  FC } from 'react'
import cn from 'classnames'

import s from './descriptionSection.module.scss'

export interface DescriptionSectionProps {
  classNames?: string
}

export const DescriptionSection: FC<DescriptionSectionProps> = ({
  classNames,
}) => {
  return (
    <div className={cn(s.descriptionSection, classNames)}>
      <div className={s.container}>
        <p>
          Fileva’s bold ambition is to develop this burgeoning collection,
          incorporating established and new voices into a place which cultivates
          discourse about the self and identity, and current cultural, social,
          and political issues. <br />
          This young yet growing collection includes
        </p>
        <p>
          established and emerging artists from around the world, representing a
          multitude of experience, positions, generations and backgrounds.
        </p>
        <p>
          Artists include Cecily Brown, Jade Fadojutimi, Ewa Juszkiewicz, Sarah
          Lucas, Shota Nakamura, Tonja Nneji, Cristina Quarles, Sanya
          Kantarovsky, Caroline Walker, Louis Fratino, Evgeny Antufiev, Joe
          Bradley, Alejandro Cardenas, Jordan Wolfson, Issy Wood and others.
        </p>
      </div>
    </div>
  )
}
