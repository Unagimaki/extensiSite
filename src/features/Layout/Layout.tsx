import React, { ReactNode, useEffect, useState } from 'react'
import { Header, Footer } from 'features'
import s from './layout.module.scss'
import { useRouter } from 'next/router'
import LoadingOverlay from 'components/LoadingOverlay/LoadingOverlay'

interface LayoutProps {
  children: ReactNode
}
export const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useRouter?.()
  const [showLoading, setShowLoading] = useState<boolean>(true) // show loader

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowLoading(false)
    }, 2500)
    return () => clearTimeout(timeout)
  }, [])

  if (pathname === '/' && showLoading) {
    return <LoadingOverlay />
  }

  return (
    <div className={s.layout}>
      <Header />
      <div className={s.content}>{children}</div>
      <Footer variant={pathname == '/shop' ? 'orange' : 'black'} />
    </div>
  )
}
