import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import { GlobalStyle } from './core'
import { getTodaysDate } from './lib/date-fns'
import { useTheme } from './lib/hooks/use-theme'
import { darkTheme, lightTheme } from './lib/themes'
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
  const [opened, setOpened] = React.useState(false)
  const [switched, setSwitched] = React.useState(false)
  const [theme, toggleTheme] = useTheme()

  const switchTheme = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSwitched(event.currentTarget.checked)
      toggleTheme()
    },
    [toggleTheme],
  )

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
      <AppBar position="fixed">
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
            <ThemeSwitch switched={switched} onChange={switchTheme} />
          </Cell>
        </Toolbar>
        <Drawer open={opened} onClose={toggleDrawer(false)} />
      </AppBar>
    </ThemeProvider>
  )
}

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
