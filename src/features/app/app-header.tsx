import { useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import { $theme, toggleTheme } from '~/features/theme'
import { getTodaysDate } from '~/lib/date-fns'
import {
  AppBar,
  Cell,
  Drawer,
  Logo,
  Menu,
  Row,
  ThemeSwitch,
  Toolbar,
} from '~/ui'

export const AppHeader = () => {
  const theme = useStore($theme)
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

  return (
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
