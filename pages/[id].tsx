import type { GetServerSideProps, NextPage } from 'next'

import IPost from '../models/Post'
import styled, { ThemeProvider } from 'styled-components'
import Container from '../components/Container'
import { ApolloClient, gql, InMemoryCache } from '@apollo/client'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/reducers'

interface HomePropTypes {
  post: IPost
}

const StyledTitle = styled.h2`
  margin-bottom: 30px;
  font-size: 88px;
  line-height: 1;
  text-transform: uppercase;
`

const StyledSupTitle = styled.p`
  font-size: 12px;
  margin-bottom: -10px;
  font-style: italic;
`

const PostPage: NextPage<HomePropTypes> = ({ post }) => {
  const { theme } = useSelector<RootState, { theme: { background: string; color: string } }>(
    (theme) => ({
      ...theme,
    }),
  )

  return (
    <ThemeProvider theme={{ ...theme }}>
      <Container theme={theme}>
        <StyledSupTitle>Body: {post.body}</StyledSupTitle>
        <StyledTitle>Title: {post.title}</StyledTitle>

        <pre>{JSON.stringify(post, null, 2)}</pre>
      </Container>
    </ThemeProvider>
  )
}

export default PostPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (context.params as { id: string }).id

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    cache: new InMemoryCache(),
  })

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

  const { post } = data
  return {
    props: { post },
  }
}
