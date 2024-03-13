import { FC, useState } from 'react'

import { NewsSection } from './NewsSection'


import s from './landingPage.module.scss'
import { DescriptionSection } from './DescriptionSection/DescriptionSection'
import { AboutSection } from './AboutSection/AboutSection'
import { GallerySection } from './GallerySection/GallerySection'
import { IntroSection } from './IntroSection/IntroSection'
import { ContactsSection } from './ContactsSection/Contacts'
import { Artists } from 'features/Artists/Artists'
import { News } from 'shared/types/news'
import { ShopSection } from './ShopSection'
import { Gallery } from 'shared/types/gallery'
import { Shop } from 'shared/types/shop'
import { gallery } from 'data/gallery'


export interface LandingPageProps {
  artists: string[]
  news: News[]
  gallery: Gallery[]
  shop: Shop[]
}

export const LandingPage: FC<LandingPageProps> = ({
  artists,
  news,
  shop,
}) => {
  const [isDescriptionHidden, setIsDescriptionHidden] = useState<boolean>(true)
  return (
    <div className={s.landingPage}>
      <IntroSection />
      <AboutSection
        isDescriptionHidden={isDescriptionHidden}
        setIsDescriptionHidden={setIsDescriptionHidden}
      />
      {!isDescriptionHidden ? <DescriptionSection /> : null}
      <GallerySection images={gallery} />
      {/* <Artists artists={artists} />
      <ContactsSection />
      <NewsSection news={news} />
      <ShopSection shop={shop} /> */}
    </div>
  )
}
