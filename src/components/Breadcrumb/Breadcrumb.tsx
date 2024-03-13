import { FC } from 'react'
import Link from 'next/link'

import s from './breadcrumb.module.scss'
import cn from 'classnames'

export type TBreadCrumb = {
  title: string
  active?: boolean
  href: string
}

interface BreadcrumbProps {
  data: TBreadCrumb[]
  disableVariant?: 'lime' | 'gray'
}

const Breadcrumb: FC<BreadcrumbProps> = ({ data, disableVariant = 'lime' }) => {
  const variantColor: string = disableVariant === 'gray' ? '#BEBDBD' : '#a3cd37'

  return (
    <div className={s.beadcrumb}>
      {data?.map((item, index) => (
        <Link href={item.href} key={index}>
          <span
            style={{
              color: item.active ? '#000' : variantColor,
            }}
            className={cn(s.link, item.active ? s.active : null)}
          >
            {item.title}
            {!item.active ? '/' : null}
          </span>
        </Link>
      ))}
    </div>
  )
}

export default Breadcrumb
