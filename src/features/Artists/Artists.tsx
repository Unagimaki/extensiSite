import { Button } from 'components'
import React, { FC, useMemo, useState } from 'react'
import img from '/public/images/artist_section_image.png'
import cn from 'classnames'
import s from './artists.module.scss'
import Image from 'next/image'

const AUTHORS_PER_PAGE = 9

interface ArtistsProps {
  artists: string[]
}

export const Artists: FC<ArtistsProps> = ({ artists }) => {
  const [state, setstate] = useState(0)

  const getAuthorArrows = (index: number) => {
    const isFirstItem = index === state * AUTHORS_PER_PAGE
    const isSecondItem = index === state * AUTHORS_PER_PAGE + 1
    const isThirdItem = index === state * AUTHORS_PER_PAGE + 2
    const isFourthItem = (index - 2) % 3 === 0
    const isFifthItem = (index - 3) % 3 === 0
    const isSixthItem = (index - 4) % 3 === 0

    if (isFirstItem || (isSixthItem && !isSecondItem)) {
      return {
        itemClasses: cn(s.item, s.centerLeft),
      }
    } else if (isSecondItem) {
      return {
        itemClasses: cn(s.item, s.leftRight),
      }
    } else if (isThirdItem) {
      return {
        itemClasses: cn(s.item, s.rightCenter),
      }
    } else if (isFourthItem) {
      return {
        itemClasses: cn(s.item, s.forthItem),
      }
    } else if (isFifthItem) {
      return {
        itemClasses: cn(s.item, s.fifthItem),
      }
    }
    return {
      itemClasses: cn(s.item, s.eighthItem),
    }
  }

  const pharseArtist = useMemo(() => {
    return artists.map(
      (item, index) => ({
        name: item,
        id: index + 1,
      })
    )
  }, [artists])

  const handleAddArtists = () => {
    setstate(prev =>
      (prev + 1) * AUTHORS_PER_PAGE > pharseArtist.length ? 0 : prev + 1
    )
  }
  return (
    <div id='artistsSection' className={s.artists}>
      <div className={s.titleWrapper}>
        <h1 className={s.title}>Artists</h1>
      </div>
      <div className={s.imageWrapper}>
        <div className={s.image}>
          <Image src={img.src} alt='image' width={532} height={532} />
        </div>
      </div>
      <div className={s.listWrapper}>
        <div className={s.list}>
          {pharseArtist
            .slice(
              state * AUTHORS_PER_PAGE,
              state * AUTHORS_PER_PAGE + AUTHORS_PER_PAGE
            )
            .map(({ id, name }) => {
              const { itemClasses } = getAuthorArrows(id - 1)
              return (
                <div key={id} className={itemClasses}>
                  <div className={s.name}>{name}</div>
                  <span className={s.number}>
                    ({id <= 100 ? 0 : null}
                    {id})
                  </span>
                </div>
              )
            })}
        </div>
        <div className={s.buttonWrapper}>
          <Button variant='black' onClick={handleAddArtists} />
        </div>
      </div>
    </div>
  )
}