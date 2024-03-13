import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { LandingPage, LandingPageProps } from 'pages'
import { getArtists } from 'shared/api/routes/artists'
import { getGallery } from 'shared/api/routes/gallery'
import { getNews } from 'shared/api/routes/news'
import { getShop } from 'shared/api/routes/shop'

const Home: NextPage<LandingPageProps> = props => {
  return (
    <>
      <Head>
        <title>Extensi one</title>
      </Head>
      <LandingPage {...props} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const [artists, news, gallery, shop] = await Promise.all([
      getArtists(),
      getNews(),
      getGallery(),
      getShop(),
    ])

    return {
      props: {
        artists: artists.data,
        news: news.data,
        gallery: gallery.data,
        shop: shop.data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        artists: [],
        news: [],
        gallery: [],
        shop: [],
      },
    }
  }
}

export default Home
