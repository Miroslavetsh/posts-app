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
      const [id] = req.url.split('/').reverse()

      const { data } = await client.query({
        query: gql`
          query {
            post(id: ${id}) {
              id
              title
              body
            }
          }
        `,
      })

      res.status(200).json({ post: data.post, error: null })
    } else {
      throw new Error('Incorrect request method for this endpoint!')
    }
  } catch (e) {
    if (e.message === '404: Not Found') {
      res.status(404).json({ post: null, error: 'No Posts Found' })
    } else {
      console.log(e)

      res.status(500).json({ post: null, error: 'Internal Server Error' })
    }
  }
}

export default withSentry(handler)
