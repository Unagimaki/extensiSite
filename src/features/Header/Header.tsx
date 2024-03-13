import s from './header.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../../public/images/logo.png'

export const Header = () => {
  return (
    <div className={s.header}>
      <Link href={'/'}>
        <div className={s.logoPosition}>
          <Image className={s.logo} src={logo} alt='logo' height={0} width={0} />
        </div>
      </Link>
    </div>
  )
}
