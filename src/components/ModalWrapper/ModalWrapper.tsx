import { FC, ReactNode } from 'react'
import cn from 'classnames'

import { CloseButton } from './closeButton'

import { modalClose } from 'store/slices/modals'
import { useAppDispatch } from 'shared/hooks/redux'

import { ModalNames, WrapperProps } from 'features/ModalViewer/ModalViewer'

import s from './modalWrapper.module.scss'

export interface ModalWrapperProps extends WrapperProps {
  children: ReactNode
  modalName: ModalNames
}

export const ModalWrapper: FC<ModalWrapperProps> = ({
  classnames,
  children,
  closeButton,
  modalName,
  withOverlay = true,
}) => {
  const dispatch = useAppDispatch()

  const handleClose = () => {
    dispatch(modalClose(modalName))
  }

  return (
    <div className={cn(s.modal, classnames)}>
      {withOverlay && <div className={s.overlay} onClick={handleClose} />}

      <div className={s.contentWrap}>
        {closeButton ? <CloseButton handleClose={handleClose} /> : null}

        <div className={s.content} onClick={e => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  )
}
