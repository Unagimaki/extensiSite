import { FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'

import { Arrow } from './Arrow'
import { useClickOutside } from 'shared/hooks/useClickOutside'

import s from './select.module.scss'

export type OptionType = {
  label: string
  value: string | number | null
  icon?: string[] | null
}

export interface SelectProps {
  label?: string
  labelPosition?: 'top' | 'bottom'
  classNames?: string
  options: OptionType[]
  defaultValue?: number
  resetButton?: boolean
  withArrow?: boolean
  openSide?: 'Top' | 'Bottom'
  error?: string
  value: OptionType | null
  onChange: (selectDefaultValue: OptionType) => void
}

export const Select: FC<SelectProps> = ({
  classNames,
  options,
  defaultValue,
  label,
  labelPosition = 'top',
  resetButton = true,
  withArrow = true,
  openSide = 'Bottom',
  error,
  value,
  onChange,
}) => {
  const valueEmpty = { value: null, icon: null, label: 'select...' }
  let ref = useRef<HTMLDivElement>(null)
  const defValue =
    defaultValue !== undefined ? options[defaultValue] : valueEmpty

  const [isOpen, setIsOpen] = useState<boolean>(false)
  const handleSelectOption = (elem: OptionType) => {
    onChange(elem)
  }

  const handleReset = () => {
    onChange(defValue)
  }

  const arrowView = (): boolean => {
    if (resetButton) {
      if (defaultValue === undefined && value?.value !== null) return true
      return (
        defaultValue !== undefined &&
        value?.value !== options[defaultValue]?.value
      )
    }
    return false
  }

  const onClickOutside = () => {
    setIsOpen(false)
  }

  useEffect(() => {
    if (!value) {
      onChange?.(defValue)
    }
  }, [])

  useClickOutside(ref, onClickOutside)

  return (
    <div className={cn(s.selectWrap, classNames)}>
      {label && labelPosition === 'top' ? (
        <div className={s.label}>{label}</div>
      ) : null}
      {error && labelPosition === 'bottom' ? (
        <div className={cn(s.error, s.errorTop)}>{error}</div>
      ) : null}

      <div
        ref={ref}
        className={s.selectContainer}
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        <div className={s.select}>
          {value?.icon?.map((item, index) => (
            <div className={s.icon} key={index}>
              <Image src={item} width={20} height={20} alt={'icon'} />
            </div>
          ))}
          <div className={s.value}>{value?.label}</div>
        </div>

        {withArrow ? (
          <div className={openSide === 'Top' ? s.arrowInverse : ''}>
            <Arrow
              arrowView={arrowView()}
              isOpen={isOpen}
              handleReset={handleReset}
            />
          </div>
        ) : null}

        {isOpen ? (
          <div className={cn(s.options, s[`open${openSide}`])}>
            {options.map((option, index) => (
              <button
                className={s.option}
                key={index}
                onClick={() => handleSelectOption(option)}
              >
                {option?.icon?.map((icons, index) => (
                  <Image
                    key={index}
                    src={icons}
                    width={20}
                    height={20}
                    alt={'option icon'}
                  />
                ))}
                {option?.label}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {error && labelPosition === 'top' ? (
        <div className={cn(s.error, s.errorBottom)}>{error}</div>
      ) : null}
      {label && labelPosition === 'bottom' ? <div>{label}</div> : null}
    </div>
  )
}
