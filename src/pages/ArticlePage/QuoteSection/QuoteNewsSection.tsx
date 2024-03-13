import classes from './quoteNewsSection.module.scss'
import { QuoteSymbol } from './components/QuoteSymbol/QuoteSymbol'
import { Article } from 'shared/types/article'
import clsx from 'classnames'
import { motion } from 'framer-motion'
import { FC, useRef } from 'react'
import { useToggle } from 'shared/hooks/useToggle'

interface QuoteNewsSectionProps {
  article: Article
}

export const QuoteNewsSection: FC<QuoteNewsSectionProps> = ({ article }) => {
  const carouselRef = useRef<HTMLDivElement | null>(null)
  const [activeCard, toggleActiveCard] = useToggle(
    article.images.map((_, index) => index)
  )
  const descText = article.descriptionText.map((item, index) => {
    return (
      <div key={index}>
        <p>{item.text}</p>
      </div>
    )
  })

  return (
    <div className={classes.quoteNewsSection}>
      <div className={classes.containerWrapper}>
        <div className={classes.header}>
          <div className={classes.topText}>
            <div className={classes.quote}>
              <QuoteSymbol />
            </div>
            <div>
              <p className={classes.autorsName}>{article.quote?.author}</p>
              <h1 className={clsx(classes.subtitle, classes.subtitle_top)}>
                {article.quote?.text}
              </h1>
            </div>
          </div>
        </div>
        <div className={classes.carouselWrapper}>
          <div ref={carouselRef} className={classes.carousel}>
            {article.images?.map((item, index) => (
              <motion.img
                src={
                  typeof item == 'string' ? item : 'src' in item ? item.src : ''
                }
                key={index}
                drag
                dragConstraints={carouselRef}
                dragSnapToOrigin={true}
                whileFocus={{ scale: 1.1 }}
                transition={{ delay: 1.2 }}
                onDragEnd={() => {
                  toggleActiveCard()
                }}
                className={clsx(classes.card, {
                  [classes.card_active]: index === activeCard,
                })}
              ></motion.img>
            ))}
          </div>
        </div>
        <div className={classes.description}>
          <div className={classes.containerText}>
            {descText}
          </div>
        </div>
      </div>
    </div>
  )
}
