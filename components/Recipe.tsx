import styled from 'styled-components'

import Recipe from '../models/Recipe'

interface RecipePropTypes {
  recipe: Recipe
}

const StyledRecipe = styled.div`
  background: #000;
`

const Recipe: React.FC<RecipePropTypes> = (props) => {
  return <StyledRecipe>{props.recipe.uri}</StyledRecipe>
}

export default Recipe
