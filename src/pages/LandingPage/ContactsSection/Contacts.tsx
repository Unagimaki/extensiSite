import React from 'react'

import { Input } from 'components/Input/Input'
import { Button } from 'components/Button/Button'

import s from './contacts.module.scss'

import { Controller, useForm } from 'react-hook-form'
import Image from 'next/image'

import Picture from '../../../../public/images/contact_label_pic.png'

interface FormData {
  email: string
}

export const ContactsSection: React.FC = () => {
  const { handleSubmit, control } = useForm<FormData>()

  const onSubmit = (e: FormData) => {
    console.log(e)
  }
  return (
    <div className={s.contacts}>
      <div className={s.label}>
        <span className={s.labelText}>
          For business&nbsp;&nbsp;&nbsp; inquiries please leave
        </span>
        <span className={s.labelText}>contact&nbsp;information</span>
        <div className={s.picture}>
          <Image
            src={Picture}
            className={s.image}
            alt='contact picture'
            width={30}
            height={50}
            sizes='100vw'
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </div>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name='email'
          render={({ field }) => (
            <Input
              name={field.name}
              onChange={field.onChange}
              className={s.input}
            />
          )}
        />
        <Button
          type='submit'
          classNames={s.button}
          variant='black'
          withArrowIcon
          decorClassName={s.decor}
        />
      </form>
    </div>
  )
}
