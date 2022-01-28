import styled, { ThemeProvider } from 'styled-components'
import ThemeColors from '../models/ThemeColors'

const StyledContainer = styled.div`
  max-width: 1218px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
  background: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
`

interface ContainerPropTypes {
  children: React.ReactNode
  theme?: {
    background: string
    color: string
  }
}

const Container: React.FC<ContainerPropTypes> = ({ theme, children }) => {
  return (
    <ThemeProvider theme={theme}>
      <StyledContainer>{children}</StyledContainer>
    </ThemeProvider>
  )
}

Container.defaultProps = {
  theme: {
    background: '#fff',
    color: '#111',
  },
}

export default Container
