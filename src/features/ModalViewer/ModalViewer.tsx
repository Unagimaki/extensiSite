import { ReactNode } from 'react'
import { ModalWrapper } from 'components'
import { useAppSelector } from 'shared/hooks/redux'

export interface WrapperProps {
  closeButton?: boolean
  classnames?: string
  withOverlay?: boolean
}

interface ModalViewer {
  modal: ReactNode
  id: ModalNames
  wrapperProps?: WrapperProps
}

// Добавь уникальное название своей модалки в тип он должен совпадать с твоим id в массиве объектов modals
export type ModalNames = 'modal' | 'example2'

export const ModalViewer = () => {
  const modalsOpened = useAppSelector(state => state.modals.modalId)

  const modals: ModalViewer[] = [
    {
      modal: <div>modal example 1</div>,
      wrapperProps: { closeButton: true, withOverlay: false },
      id: 'modal',
    },
    {
      modal: <div>modal example 2</div>,
      id: 'example2',
    },
    // для каждой модалки нужно добавить объект с id который должен быть уникальным,
    // и свой компонент модалки в ключь modals
  ]

  return (
    <>
      {modals
        .filter(modal => modalsOpened.find(item => modal.id === item))
        .map(modal => (
          <ModalWrapper
            modalName={modal.id}
            key={modal.id}
            {...modal.wrapperProps}
          >
            {modal.modal}
          </ModalWrapper>
        ))}
    </>
  )
}
