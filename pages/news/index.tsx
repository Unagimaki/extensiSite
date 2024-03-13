import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { NewsPage } from 'pages'
import { getNews } from 'shared/api/routes/news'
import { News as New } from 'shared/types/news'

interface NewsProps {
  news: New[]
}

const News: NextPage<NewsProps> = ({ news }) => {
  return (
    <>
      <Head>
        <title>News</title>
      </Head>
      <NewsPage news={news} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const newsResponse = await getNews()

  return {
    props: {
      news: newsResponse.data,
    },
  }
}

export default News
