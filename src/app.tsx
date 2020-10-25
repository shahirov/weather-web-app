import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './core'
import { getTodaysDate } from './lib/date-fns'
import { useTheme } from './lib/hooks'
import { darkTheme, lightTheme } from './lib/themes'
import { Pages } from './pages'
import {
  AppBar,
  Cell,
  Drawer,
  Logo,
  Menu,
  Row,
  ThemeSwitch,
  Toolbar,
} from './ui'

export const App = () => {
  const [theme, toggleTheme] = useTheme()
  const [opened, setOpened] = React.useState(false)

  const toggleDrawer = React.useCallback(
    (open: boolean) => (
      event: React.KeyboardEvent | React.MouseEvent | KeyboardEvent,
    ) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setOpened(open)
    },
    [],
  )

  const themeMode = theme === 'light' ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Layout>
        <AppBar>
          <Toolbar>
            <Cell as={LeftSection} area="left-section">
              <Row align="center">
                <Menu onClick={toggleDrawer(true)} />
                <Logo />
              </Row>
            </Cell>
            <Cell area="date" place="center">
              <DateText>{getTodaysDate()}</DateText>
            </Cell>
            <Cell as={RightSection} area="right-section" place="center end">
              <ThemeSwitch checked={theme === 'dark'} onChange={toggleTheme} />
            </Cell>
          </Toolbar>
          <Drawer open={opened} onClose={toggleDrawer(false)} />
        </AppBar>
        <Main>
          <Pages />
        </Main>
      </Layout>
    </ThemeProvider>
  )
}

const Layout = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  min-height: 100%;

  & > * {
    flex-shrink: 0;
  }
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
`

const LeftSection = styled.div`
  @media screen and (max-width: 960px) {
    width: 100%;

    & > div {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 0 5fr;
    }
  }
`

const DateText = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  text-transform: uppercase;
`

const RightSection = styled.div`
  @media screen and (max-width: 960px) {
    place-self: center center;
  }
`
