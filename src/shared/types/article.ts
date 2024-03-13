import { ImageProps } from 'next/image'

export type Section = {
  title: string
  text: string
}

type Quote = {
  author: string
  text: string
}

type Text = {
  text: string
}

export interface ArticleShort {
  id: number
  title: string
  subtitle: string
}
export interface Article {
  id: number
  title: string
  topic: string
  bg_image: ImageProps['src']
  descriptionText: Text[]
  author: string
  date: string
  sections: Section[]
  quote?: Quote
  related_posts: ArticleShort[]
  images: ImageProps['src'][]
}
