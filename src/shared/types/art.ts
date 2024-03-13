import { ImageProps } from 'next/image'

export interface Art {
  id: number
  name: string
  price: number
  image: ImageProps['src']
  artist: string
}
