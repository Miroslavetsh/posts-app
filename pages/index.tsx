import styled, { ThemeProvider } from 'styled-components'
import type { GetStaticProps, NextPage } from 'next'
import axios from 'axios'

import IPost from '../models/Post'
import ThemeColors from '../models/ThemeColors'

import Post from '../components/Post'

interface HomePropTypes {
  posts: Array<IPost>
}

interface StyledPagePropTypes {
  theme: {
    maxWidth: string
    light: {
      background: ThemeColors.LIGHT_BACKGROUND
      color: ThemeColors.LIGHT_TEXT_COLOR
    }
    dark: {
      background: ThemeColors.DARK_BACKGROUND
      color: ThemeColors.DARK_TEXT_COLOR
    }
  }
}

const StyledPage = styled.div<StyledPagePropTypes>`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  background-color: ${(props) => props.theme.light.background};
  color: ${(props) => props.theme.light.color}; ;
`

const theme = {
  maxWidth: '1218px',
  light: {
    background: ThemeColors.LIGHT_BACKGROUND,
    color: ThemeColors.LIGHT_TEXT_COLOR,
  },
  dark: {
    background: ThemeColors.DARK_BACKGROUND,
    color: ThemeColors.DARK_TEXT_COLOR,
  },
}

const Home: NextPage<HomePropTypes> = ({ posts }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledPage>
        {posts.map((post) => (
          <Post id={post.id} key={post.title} post={post} />
        ))}
      </StyledPage>
    </ThemeProvider>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}`)

  return {
    props: {
      posts: data,
    },
  }
}
