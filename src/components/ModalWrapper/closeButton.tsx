import { FC } from 'react'

import s from './modalWrapper.module.scss'

export interface CloseButtonProps {
  handleClose: () => void
}

export const CloseButton: FC<CloseButtonProps> = ({ handleClose }) => {
  return (
    <button className={s.closeButton} onClick={handleClose}>
      {/*add you icon*/}
      &#9587;
    </button>
  )
}
