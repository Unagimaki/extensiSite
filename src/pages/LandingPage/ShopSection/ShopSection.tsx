import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Vimosh from '/public/images/vimosh.png'
import { Button } from 'components'

import s from './shopSection.module.scss'
import { Shop } from 'shared/types/shop'

import cn from 'classnames'

interface ShopSectionProps {
  shop: Shop[]
}

export const ShopSection: FC<ShopSectionProps> = ({ shop }) => {
  const router = useRouter()
  const onClick = () => {
    router.push('./shop')
  }
  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <div className={s.descriptionBlock}>
          <h1 className={s.title}>Shop</h1>
          <div className={s.subtitleBlock}>
            <div className={s.firstStr}>You can buy</div>
            <div className={s.scndtStr}>our art</div>
            <div className={s.thdStr}>reproductions</div>
            <div className={s.descriptionBlockImage}>
              <Image src={Vimosh} alt='image' />
            </div>
          </div>
        </div>
        <div className={s.picturesBlock}>
          {shop?.slice(0, 2).map((item, index) => {
            return (
              <div
                key={item.id}
                className={cn(
                  s.picture,
                  index === 1 ? s.lastImage : s.firstImage
                )}
              >
                <Image
                  src={item?.image}
                  alt={item?.name}
                  width={0}
                  height={0}
                  sizes='100vw'
                  objectFit='cover'
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            )
          })}
          <div className={s.btn}>
            <Button variant='black' onClick={onClick} />
          </div>
        </div>
      </div>
    </div>
  )
}
