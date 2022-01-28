import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

import IPost from '../models/Post'
import styled from 'styled-components'
import Container from '../components/Container'

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
  console.log(post)

  return (
    <Container>
      <StyledSupTitle>Body: {post.body}</StyledSupTitle>
      <StyledTitle>Title: {post.title}</StyledTitle>

      <pre>{JSON.stringify(post, null, 2)}</pre>
    </Container>
  )
}

export default PostPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (context.params as { id: string }).id

  console.log(process.env.VERCEL_URL)

  const { data } = await axios.get(process.env.VERCEL_URL + '/api/posts/' + id)
  const { post } = data
  return {
    props: { post },
  }
}
