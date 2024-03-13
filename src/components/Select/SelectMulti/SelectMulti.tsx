import { FC, useEffect, useRef, useState } from 'react'
import cn from 'classnames'
import Image from 'next/image'

import { Arrow } from './Arrow'

import { useClickOutside } from 'shared/hooks/useClickOutside'

import s from './selectMulti.module.scss'

export type OptionType = {
  label: string
  value: string | number | null
  icon?: string[] | null
}

interface SelectMultiProps {
  label?: string
  labelPosition?: 'top' | 'bottom'
  classNames?: string
  options: OptionType[]
  defaultValue?: number[]
  resetButton?: boolean
  withArrow?: boolean
  openSide?: 'Top' | 'Bottom'
  error?: string
  value: OptionType[] | null
  onChange: (selectDefaultValue: OptionType[]) => void
}

export const SelectMulti: FC<SelectMultiProps> = ({
  classNames,
  options,
  defaultValue,
  label,
  labelPosition = 'top',
  resetButton = true,
  withArrow = true,
  openSide = 'Bottom',
  onChange,
  value,
  error,
}) => {
  const valueEmpty = { value: null, icon: null, label: 'select...' }
  let ref = useRef<HTMLDivElement>(null)

  const defValue =
    defaultValue !== undefined
      ? defaultValue?.map(item => options[item])
      : [valueEmpty]

  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleSelectOption = (elem: OptionType) => {
    if (value?.find(item => item.value === elem.value)) return
    if (value?.[0].value === null) return onChange([elem])
    if (value) onChange([...value, elem])
  }

  const handleReset = () => {
    onChange(defValue)
  }

  const onClickOutside = () => {
    setIsOpen(false)
  }

  const handleResetValue = (resetValue: number | string | null) => {
    if (value) onChange(value?.filter(item => item?.value !== resetValue))
    if (value && value?.length < 2) {
      onChange(defValue)
    }
  }

  useClickOutside(ref, onClickOutside)

  const arrowView = (): boolean => {
    if (resetButton) {
      if (value && value?.length > 1) return true
    }
    return false
  }

  const valueRemoveView = (elemValue: number | string | null) => {
    if (defaultValue !== undefined) {
      return value && value?.length > 1
    }
    return !!elemValue
  }

  useEffect(() => {
    if (!value) {
      onChange?.(defValue)
    }
  }, [])

  return (
    <div className={cn(s.selectWrap, classNames)}>
      {label && labelPosition === 'top' ? <div>{label}</div> : null}
      {error && labelPosition === 'bottom' ? (
        <div className={cn(s.error, s.errorTop)}>{error}</div>
      ) : null}

      <div
        ref={ref}
        className={s.selectContainer}
        onClick={() => setIsOpen(prevState => !prevState)}
      >
        <div className={s.select}>
          {value?.map((item, index) => (
            <div key={index} className={s.multiValue}>
              {item?.icon?.map((icon, index) => (
                <Image
                  key={index}
                  src={icon}
                  width={20}
                  height={20}
                  alt={'option icon'}
                />
              ))}

              <div className={s.value}>{item?.label}</div>

              {valueRemoveView(item?.value) ? (
                <button
                  className={s.arrow}
                  onClick={() => handleResetValue(item?.value)}
                >
                  {/*add you icon for value reset cross icon*/}
                  &#9587;
                </button>
              ) : null}
            </div>
          ))}
        </div>

        {withArrow ? (
          <div className={openSide === 'Top' ? s.arrowInverse : ''}>
            <Arrow
              isOpen={isOpen}
              handleReset={handleReset}
              arrowView={arrowView()}
            />
          </div>
        ) : null}

        {isOpen ? (
          <div className={cn(s.options, s[`open${openSide}`])}>
            {options?.map((option, index) => (
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
