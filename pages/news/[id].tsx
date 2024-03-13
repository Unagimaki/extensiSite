import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import { ArticlePage } from 'pages'
import { getArticle } from 'shared/api/routes/articles'
import { Article as Art } from 'shared/types/article'

interface ArticleProps {
  article: Art
}

const Article: NextPage<ArticleProps> = ({ article }) => {
  return (
    <>
      <Head>
        <title>News - {article.title}</title>
      </Head>
      <ArticlePage article={article} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { id } = context.query

  const articleResponse = await getArticle(Number(id))
  return {
    props: {
      article: articleResponse.data,
    },
  }
}

export default Article
