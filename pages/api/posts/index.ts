import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_API_URL,
  cache: new InMemoryCache(),
})

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const { data } = await client.query({
        query: gql`
          query ($options: PageQueryOptions) {
            posts(options: $options) {
              data {
                id
                title
              }
            }
          }
        `,
        variables: {
          options: {
            paginate: {
              page: 1,
              limit: 15,
            },
          },
        },
      })

      res.status(200).json({ posts: data.posts, error: null })
    } else {
      throw new Error('Incorrect request method for this endpoint!')
    }
  } catch (e) {
    if (e.message === '404: Not Found') {
      res.status(404).json({ posts: null, error: 'No Posts Found' })
    } else {
      console.log(e)

      res.status(500).json({ posts: null, error: 'Internal Server Error' })
    }
  }
}

export default withSentry(handler)
