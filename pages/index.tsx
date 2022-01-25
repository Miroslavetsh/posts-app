import styled, { ThemeProvider } from 'styled-components'
import type { GetStaticProps, NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import axios from 'axios'
import * as Sentry from '@sentry/nextjs'

import IPost from '../models/Post'
import ThemeColors from '../models/ThemeColors'

import Post from '../components/Post'
import { setLightTheme, setDarkTheme } from '../redux/actions/theme'
import { Themes } from '../utils/constants'
import { RootState } from '../redux/reducers'

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
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color}; ;
`

const Home: NextPage<HomePropTypes> = ({ posts }) => {
  const dispatch = useDispatch<Dispatch>()
  const { theme } = useSelector<RootState, { theme: {} }>((theme) => ({
    ...theme,
  }))

  const handleLightThemeButtonClick = () => {
    dispatch(setLightTheme())
  }
  const handleDarkThemeButtonClick = () => {
    dispatch(setDarkTheme())
  }

  Sentry.init({
    dsn: 'https://7ed1b1c0b5824e09bfa6b2a6632f2f43@o1125972.ingest.sentry.io/6166483',

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  })

  const pageTheme = {
    maxWidth: '1218px',
    ...theme,
  }

  return (
    <ThemeProvider theme={{ ...pageTheme }}>
      <StyledPage>
        {posts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </StyledPage>

      <button onClick={handleLightThemeButtonClick}>Set Light Theme</button>
      <button onClick={handleDarkThemeButtonClick}>Set Dark Theme</button>
      <button
        type='button'
        onClick={() => {
          throw new Error('Sentry Frontend Error')
        }}>
        Throw error
      </button>
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
