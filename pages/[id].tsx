import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

import IPost from '../models/Post'

interface HomePropTypes {
  post: IPost
}

const PostPage: NextPage<HomePropTypes> = ({ post }) => {
  return <div>{post.title}</div>
}

export default PostPage

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = (context.params as { id: string }).id
  console.log(`${process.env.NEXT_PUBLIC_API_URL}/${id}`)

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/${id}`)

  return {
    props: { post: data },
  }
}
