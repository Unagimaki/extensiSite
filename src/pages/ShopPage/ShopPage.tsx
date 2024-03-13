import { FC, useMemo, useState } from 'react'

import s from './shopPage.module.scss'
import Image from 'next/image'
import { Button } from 'components'
import { Art } from 'shared/types/art'
import Link from 'next/link'

interface ShopPageProps {
  arts: Art[]
}
const SLICE_LENGTH = 14

export const ShopPage: FC<ShopPageProps> = ({ arts }) => {
  const [pagination, setPagination] = useState<number>(1)

  const slicesedData: any[] = useMemo(() => {
    return arts?.slice(
      pagination === 1 ? 0 : SLICE_LENGTH * (pagination - 1),
      SLICE_LENGTH * pagination
    )
  }, [pagination])

  const getNamesSeparatedByCommas = (arr: Art[]) => {
    return arr?.map(item => item.name).join(', ')
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.header}>
          <h1 className={s.title}>Shop</h1>
          <h2 className={s.subTitle}>
            You can buy reproductions of our paintings directly on the website
          </h2>
        </div>
        <div className={s.content}>
          <div className={s.picturesBlock}>
            {slicesedData?.map(picture => (
              <div key={picture.id} className={s.picture}>
                <Link href={`./shop/${picture.id}`}>
                  <Image
                    src={picture.image}
                    alt={picture.name}
                    width={0}
                    height={0}
                    objectFit='contain'
                    sizes='100vw'
                    style={{ width: '100%', height: 'auto' }}
                  />
                </Link>
              </div>
            ))}
            <div className={s.namesBlock}>
              <div className={s.firstNamesBlock}>
                {getNamesSeparatedByCommas(slicesedData)}
              </div>
              <div className={s.secondNamesBlock}>
                {getNamesSeparatedByCommas(slicesedData)}
              </div>
            </div>
          </div>
        </div>
        <div className={s.buttonBlock}>
          <Button
            variant='black'
            withArrowIcon
            decorClassName={s.decor}
            onClick={() => {
              if (SLICE_LENGTH * pagination >= arts.length) {
                setPagination(() => 1)
              } else {
                setPagination(prev => prev + 1)
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}
