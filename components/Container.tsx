import styled from 'styled-components'

const StyledContainer = styled.div`
  max-width: 1218px;
  width: 100%;
  margin: 0 auto;
  padding: 0 15px;
`

interface ContainerPropTypes {
  children: React.ReactNode
}

const Container: React.FC<ContainerPropTypes> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>
}

export default Container
