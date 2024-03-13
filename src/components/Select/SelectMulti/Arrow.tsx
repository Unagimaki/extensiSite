import { FC } from 'react'
import cn from 'classnames'

import s from './selectMulti.module.scss'

export interface ArrowProps {
  handleReset: () => void
  arrowView: boolean
  isOpen: boolean
}

export const Arrow: FC<ArrowProps> = ({ handleReset, arrowView, isOpen }) => {
  return (
    <>
      {arrowView ? (
        <button className={s.arrow} onClick={handleReset}>
          {/*add you icon for select cross icon*/}
          &#9587;
        </button>
      ) : (
        <button className={cn(s.arrow, { [s.arrowUp]: isOpen })}>
          {/*add you icon for select arrow icon*/}
          &#9660;
        </button>
      )}
    </>
  )
}
