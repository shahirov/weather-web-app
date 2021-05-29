import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { selectIsAuthChecked, selectIsUserAuthenticated } from '~/features/auth'
import { ThemeProvider } from '~/features/theme/theme-provider'
import { Spin } from '~/ui'

import { GlobalStyle } from './global-style'

type Props = {
  children: React.ReactNode
}

export const AppFrame = ({ children }: Props) => {
  const isAuthenticated = useSelector(selectIsUserAuthenticated)
  const authChecked = useSelector(selectIsAuthChecked)

  if (!isAuthenticated && !authChecked) {
    return (
      <>
        <GlobalStyle />
        <Layout>
          <SpinSection>
            <Spin tip="Launching Weatherio..." />
          </SpinSection>
        </Layout>
      </>
    )
  }

  return (
    <ThemeProvider>
      <GlobalStyle />
      <Layout>{children}</Layout>
    </ThemeProvider>
  )
}

const SpinSection = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 100%;
  color: #1890ff;
  opacity: 1;
  z-index: 1100;
`

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & > * {
    flex-shrink: 0;
  }
`
