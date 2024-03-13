import React, { FC, HTMLProps } from 'react'
import cn from 'classnames'

import s from './input.module.scss'

export const Input: FC<Partial<HTMLProps<HTMLInputElement>>> = ({
  className,
  ...props
}) => {
  return (
    <input
      placeholder='your email address'
      className={cn(s.input, className)}
      {...props}
    />
  )
}
