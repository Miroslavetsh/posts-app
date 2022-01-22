import type { GetServerSideProps, NextPage } from 'next'
import axios from 'axios'

import IRecipe from '../../models/Recipe'

interface HomePropTypes {
  recipe: IRecipe
}

const Home: NextPage<HomePropTypes> = ({ recipe }) => {
  return <div>{recipe.uri}</div>
}

export default Home

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {},
  }
}
