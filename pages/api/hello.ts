import { withSentry } from '@sentry/nextjs'
import { NextApiRequest, NextApiResponse } from 'next'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    res.send(`<pre>${JSON.stringify("{ status: 200, body: 'Hello from API' }", null, 2)}</pre>`)
  } else {
    throw new Error('Incorrect request method for this endpoint!')
  }
}

export default withSentry(handler)
