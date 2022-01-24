import Link from 'next/link'
import styled from 'styled-components'

import IPost from '../models/Post'

export interface PostPropTypes {
  post: IPost
}

interface StyledPostPropTypes {
  textColor: string
}

const StyledPost = styled.div<StyledPostPropTypes>`
  background: #000;
  color: ${({ textColor }) => (textColor ? textColor : '#000')}; ;
`

const Post: React.FC<PostPropTypes> = ({ post }) => {
  return (
    <StyledPost textColor='#fff'>
      <Link href={`/${post.id}`}>{post.title}</Link>
    </StyledPost>
  )
}

export default Post
