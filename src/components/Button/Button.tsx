import { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames'
import Plus from '/public/assets/icons/plus.svg'
import Arrow from '/public/assets/icons/arrow.svg'
import s from './button.module.scss'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: () => void
  classNames?: string
  withArrowIcon?: boolean
  variant?: 'white' | 'black'
  decorClassName?: string
}

export const Button: FC<ButtonProps> = ({
  onClick,
  classNames,
  variant = 'white',
  withArrowIcon = false,
  decorClassName,
  ...props
}) => {
  return (
    <button
      className={cn(s.button, s[variant], classNames)}
      onClick={onClick}
      {...props}
    >
      {withArrowIcon ? (
        <Arrow className={cn(s.icon, s.arrow)} />
      ) : (
        <Plus className={s.icon} />
      )}
      <div className={cn(s.decor, decorClassName)}></div>
    </button>
  )
}
