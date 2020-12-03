import './init'

import { useStore } from 'effector-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renderRoutes, RouteConfig } from 'react-router-config'
import { NavLink } from 'react-router-dom'
import styled from 'styled-components'

import HamburgerIcon from '~/assets/images/hamburger.svg'
import { logout, selectIsUserAuthenticated, selectUser } from '~/features/auth'
import { $theme, toggleTheme } from '~/features/theme'
import { getTodaysDate } from '~/lib/date-fns'
import {
  AppBar,
  Avatar,
  Cell,
  Drawer,
  Grid,
  IconButton,
  Logo,
  Row,
  Switch,
} from '~/ui'

import { makeRoutes } from './routes'

export const Root = () => {
  const [routes, setRoutes] = React.useState<RouteConfig[]>([])
  const isAuthenticated = useSelector(selectIsUserAuthenticated)

  React.useEffect(() => {
    setRoutes(makeRoutes(isAuthenticated))
  }, [isAuthenticated])

  return (
    <>
      {isAuthenticated && <AppHeader />}
      <Main>{renderRoutes(routes)}</Main>
    </>
  )
}

const AppHeader = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)
  const theme = useStore($theme)
  const [opened, setOpened] = React.useState(false)

  const profileName = user ? user.email : ''
  const profileImageUrl =
    user && user.photoUrl
      ? user.photoUrl
      : 'https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png'
  const activeStyle = {
    borderBottom: '1px solid #495cfc',
    color: '#495cfc',
  }

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

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar>
      <Grid
        as={Toolbar}
        areas="'left-section date right-section'"
        places="center stretch"
        cols="1.3fr 2fr 1.1fr"
        rows="minmax(4rem, auto)"
      >
        <Cell as={LeftSection} area="left-section">
          <Row align="center">
            <IconButton aria-label="open drawer" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Logo />
          </Row>
        </Cell>
        <Cell area="date" place="center">
          <DateText>{getTodaysDate()}</DateText>
        </Cell>
        <Cell as={RightSection} area="right-section" place="center end">
          <Row align="center">
            <SwitchItem>Light</SwitchItem>
            <Switch
              name="theme"
              aria-label="switch theme"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
            <SwitchItem>Dark</SwitchItem>
          </Row>
        </Cell>
      </Grid>
      <Drawer
        areas="
          'header'
          'nav'
          'copyright'
        "
        rows="2fr 4fr 1fr"
        cols="1fr"
        gaps="1rem"
        open={opened}
        onClose={toggleDrawer(false)}
      >
        <Cell as={Header} area="header">
          <GreetingText>Welcome back</GreetingText>
          <Row as={Block} align="center">
            <Avatar
              width="4rem"
              height="4rem"
              alt="Your profile image"
              src={profileImageUrl}
            />
            <AccountDetails>
              <AccountEmail>{profileName}</AccountEmail>
              <AccountPlan>Free Plan</AccountPlan>
            </AccountDetails>
          </Row>
        </Cell>
        <Cell as={Navigation} area="nav">
          <Row as={NavList} direction="column" align="stretch">
            <li>
              <Item
                exact
                to="/"
                activeStyle={activeStyle}
                onClick={toggleDrawer(false)}
              >
                Home
              </Item>
            </li>
            <li>
              <Item
                exact
                to="/add"
                activeStyle={activeStyle}
                onClick={toggleDrawer(false)}
              >
                Add City
              </Item>
            </li>
            <li>
              <LogoutButton type="button" onClick={handleLogout}>
                Logout
              </LogoutButton>
            </li>
          </Row>
        </Cell>
        <Cell area="copyright" place="center">
          <span>Copyright © 2020 Weatherio</span>
        </Cell>
      </Drawer>
    </AppBar>
  )
}

const Toolbar = styled.div`
  width: 100%;
  padding: 0 1.5rem;

  @media screen and (max-width: 960px) {
    grid-template-areas:
      'left-section'
      'date'
      'right-section';
    grid-template-columns: 1fr;
    grid-template-rows: repeat(3, 1fr);
    place-items: center center;
    padding: 0 1rem;
  }
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

const MenuIcon = styled(HamburgerIcon)`
  width: 3rem;
  height: 1.2rem;
  fill: ${({ theme }) => theme.colors.text};
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

const SwitchItem = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
`

const Header = styled.section`
  color: #fff;
  background: ${({ theme }) => theme.colors.background.drawerHeader};
  box-shadow: 0 0.5rem 2rem rgba(0, 0, 255, 0.2);
`

const GreetingText = styled.span`
  display: block;
  padding-top: 1.44rem;
  font-size: 1.4rem;
  letter-spacing: 0.15rem;
  text-align: center;
  text-transform: uppercase;
`

const Block = styled.div`
  margin-top: 2.6rem;
  margin-left: 3rem;

  @media screen and (max-width: 960px) {
    flex-direction: column;
    justify-content: center;
    margin: 0;
    margin-top: 1rem;
  }
`

const AccountDetails = styled.div`
  margin-left: 1.5rem;
`

const AccountEmail = styled.span`
  display: block;
  margin-bottom: 0.3rem;
  font-size: 1.2rem;
`

const AccountPlan = styled.span`
  display: block;
  font-size: 1rem;
`

const Navigation = styled.nav`
  width: 100%;
  height: 100%;
`

const NavList = styled.ul`
  margin: 1rem 0;
  padding-left: 2.5rem;
  height: 100%;
`

const Item = styled(NavLink)`
  display: block;
  margin: 0.5rem 0;
  padding: 1rem 0;
  outline: none;
  cursor: pointer;
`

const LogoutButton = styled.button`
  display: flex;
  width: 100%;
  border: 0;
  margin: 0.5rem 0;
  padding: 1rem 0;
  font: inherit;
  color: ${({ theme }) => theme.colors.text};
  outline: none;
  background: transparent;
  cursor: pointer;
`

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
`
