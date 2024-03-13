import { NextPage } from 'next'
import Head from 'next/head'

import { ArtPage } from 'pages'
import { getArtById, getArts } from 'shared/api/routes/arts'
import { Art } from 'shared/types/art'
interface ArtProps {
  art: Art
  arts: Art[]
}

const Art: NextPage<ArtProps> = props => (
  <>
    <Head>
      <title>Shop - {props?.art?.name}</title>
    </Head>
    <ArtPage {...props} />
  </>
)

export const getServerSideProps = async ({
  params,
}: {
  params: { art: string }
}) => {
  try {
    const [artById, arts] = await Promise.all([
      getArtById(+params.art),
      getArts(),
    ])

    return {
      props: {
        arts: arts.data,
        art: artById.data,
      },
    }
  } catch (error) {
    console.error('Error fetching data:', error)
    return {
      props: {
        arts: [],
        art: {},
      },
    }
  }
}

export default Art
