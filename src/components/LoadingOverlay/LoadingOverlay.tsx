import { FC, useEffect, useState } from 'react'
import s from './loadingOverlay.module.scss'

import cn from 'classnames'
import { useProgress } from '@react-three/drei'
import Head from 'next/head'

const LoadingOverlay: FC = () => {
  const [show, setShow] = useState<boolean>(true) // show loader

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(false)
    }, 2500)
    return () => clearTimeout(timeout)
  }, [])
  return (
    <>
      <Head>
        <title>Extensi one</title>
      </Head>
      <div className={cn(s.loadingOverlay, show ? s.show : null)}>
        <div className={s.container}>
          <div className={s.loading}>
            <div id='first'>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div>
                            <div>
                              <div>
                                <div></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoadingOverlay
