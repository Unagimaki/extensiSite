import { FC } from 'react'
import s from './quoteSymbol.module.scss'
import QuoteIcon from '/public/assets/icons/quote.svg'
export const QuoteSymbol: FC = () => {
  return (
    <div className={s.quoteSymbol}>
      <QuoteIcon />
      <div className={s.decor}></div>
      <div className={s.decor_2}></div>
    </div>
  )
}
