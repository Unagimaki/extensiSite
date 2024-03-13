import { FC, ReactNode } from 'react'
import cn from 'classnames'

import { Icon } from './Icon'

import s from './checkbox.module.scss'

export interface CheckboxProps {
  classNames?: string
  variant?: 'Quad' | 'Circle' | 'Toggle'
  children?: string | ReactNode
  labelPosition?: 'right' | 'left' | 'top' | 'bottom'
  onChecked: (value: boolean) => void
  defValue?: boolean
}

export const Checkbox: FC<CheckboxProps> = ({
  classNames,
  variant = 'Quad',
  onChecked,
  children,
  labelPosition = 'right',
  defValue,
}) => {
  const handleChange = (value: boolean) => {
    onChecked(value)
  }

  return (
    <div
      className={cn(s.checkboxWrap, s[variant], classNames)}
      style={{
        flexDirection:
          labelPosition === 'bottom'
            ? 'column'
            : labelPosition === 'top'
            ? 'column-reverse'
            : 'row',
      }}
    >
      <label className={s.label}>
        <input
          defaultChecked={defValue}
          className={s.checkbox}
          type='checkbox'
          onChange={e => handleChange(e.target.checked)}
        />
        <span className={s.fakeCheckbox}>
          <span className={s.checkmark}>{variant === 'Quad' && <Icon />}</span>
        </span>
      </label>

      {children && (
        <div style={{ order: labelPosition === 'left' ? 0 : 1 }}>
          {children}
        </div>
      )}
    </div>
  )
}
