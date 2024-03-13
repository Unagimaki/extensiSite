import { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import { ShopPage } from 'pages'
import { getArts } from 'shared/api/routes/arts'
import { Art } from 'shared/types/art'

interface ShopProps {
  arts: Art[]
}

const Shop: NextPage<ShopProps> = ({ arts }) => {
  return (
    <>
      <Head>
        <title>Shop</title>
      </Head>
      <ShopPage arts={arts} />
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const arts = await getArts()
  return {
    props: {
      arts: arts.data,
    },
  }
}

export default Shop
