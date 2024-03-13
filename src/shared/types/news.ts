import { ImageProps } from 'next/image'

export interface News {
  id: number
  title: string
  subtitle: string
  image: ImageProps['src']
}
