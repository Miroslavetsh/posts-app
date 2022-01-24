import Link from 'next/link'
import styled from 'styled-components'

import IPost from '../models/Post'

interface RecipePropTypes {
  id: number
  post: IPost
}

interface StyledRecipePropTypes {
  textColor: string
}

const StyledRecipe = styled.div<StyledRecipePropTypes>`
  background: #000;
  color: ${({ textColor }) => (textColor ? textColor : '#000')}; ;
`

const Recipe: React.FC<RecipePropTypes> = (props) => {
  return (
    <StyledRecipe textColor='#fff'>
      <Link href={`/${props.id}`}>{props.post.title}</Link>
    </StyledRecipe>
  )
}

export default Recipe
