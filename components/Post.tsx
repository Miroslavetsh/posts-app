import Link from 'next/link'
import styled, { ThemeProvider } from 'styled-components'

import IPost from '../models/Post'

export interface PostPropTypes {
  post: IPost
}

const StyledPost = styled.div`
  padding: 10px 20px;
  border: 1px solid #d3d3d3;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
`

const Post: React.FC<PostPropTypes> = (props) => {
  return (
    <StyledPost>
      <Link href={`/${props.post.id}`}>{props.post.title}</Link>
    </StyledPost>
  )
}

export default Post
