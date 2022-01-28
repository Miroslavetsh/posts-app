import type { GetStaticProps, NextPage } from 'next'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch } from 'redux'
import * as Sentry from '@sentry/nextjs'

import axios from 'axios'
import styled, { ThemeProvider } from 'styled-components'

import IPost from '../models/Post'

import Post from '../components/Post'
import Container from '../components/Container'
import { setLightTheme, setDarkTheme } from '../redux/actions/theme'
import { RootState } from '../redux/reducers'

interface HomePropTypes {
  posts: Array<IPost>
}

const StyledPage = styled.div`
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
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    tracesSampleRate: 1.0,
  })

  const pageTheme = {
    ...theme,
  }

  return (
    <Container>
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
          Throw error for Sentry
        </button>
      </ThemeProvider>
    </Container>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await axios.get(process.env.VERCEL_URL + '/api/posts')

  return {
    props: {
      posts: data.posts.data,
    },
  }
}
