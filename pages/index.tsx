import type { GetStaticProps, NextPage } from 'next'
import axios from 'axios'

import IRecipe from '../models/Recipe'

import Recipe from '../components/Recipe'

interface HomePropTypes {
  recipes: Array<{ recipe: IRecipe }>
}

const Home: NextPage<HomePropTypes> = ({ recipes }) => {
  return (
    <div>
      {recipes.map(({ recipe }) => (
        <Recipe key={recipe.uri} recipe={recipe} />
      ))}
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async (context) => {
  const { data } = await axios.get('https://api.edamam.com/search', {
    params: {
      q: 'pizza',
      from: 0,
      to: 10,
      more: false,
      app_key: process.env.NEXT_PUBLIC_APP_KEY,
      app_id: process.env.NEXT_PUBLIC_APP_ID,
    },
  })

  return {
    props: {
      recipes: data.hits,
    },
  }
}
