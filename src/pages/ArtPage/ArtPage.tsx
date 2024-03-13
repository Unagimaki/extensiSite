import { FC } from 'react'
import { OtherWorkSection } from './OtherWorkSection'
import { ArtSection } from './ArtSection/ArtSection'
import { Art } from 'shared/types/art'
import { ContactSection } from './ContactSection'

interface ArtPageProps {
  art: Art
  arts: Art[]
}

export const ArtPage: FC<ArtPageProps> = ({ art, arts }) => {
  return (
    <>
      <ArtSection art={art} />
      <ContactSection />
      <OtherWorkSection art={arts} />
    </>
  )
}
