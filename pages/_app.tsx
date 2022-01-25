import { Provider } from 'react-redux'
import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'
import { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    padding: 2em 0;
  }

  a {
    color: inherit;
  }
`

function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Component {...pageProps} />
    </Provider>
  )
}

const makeStore = () => store
const wrapper = createWrapper(makeStore, { debug: true })

export default wrapper.withRedux(App)
