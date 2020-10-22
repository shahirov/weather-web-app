import React from 'react'
import { Link } from 'react-router-dom'
import styled, { css } from 'styled-components'

import MenuIcon from '~/assets/icons/menu-icon.svg'
import { getTodaysDate } from '~/lib/date-fns'
import LogoIcon from '~/logo.svg'
import { Cell, Grid } from '~/ui/grid'
import { Row } from '~/ui/row'

type Props = {
  position?: 'fixed' | 'static' | 'absolute' | 'relative' | 'sticky'
}

const AppHeader = styled.header<Pick<Props, 'position'>>`
  ${({ position }) =>
    position === 'fixed'
      ? css`
          position: fixed;
          top: 0;
          right: 0;
          left: auto;
        `
      : css`
          position: relative;
        `};

  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  z-index: 1100;
  width: 100%;
  min-height: 4rem;
  background: #fff;
  box-shadow: rgba(0, 0, 255, 0.1) 0 0 2rem;
  animation: 0.5s ease-in-out 0s 1 normal none running slide-down,
    1s ease-in-out 0s 1 normal none running fade-in;
`

const Toolbar = styled(Grid)`
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

const IconButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  border: 0;
  margin: 0 1rem 0 -0.75rem;
  padding: 0.75rem;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  color: inherit;
  overflow: visible;
  background: transparent;
  user-select: none;
  outline: none;
  cursor: pointer;

  @media screen and (max-width: 960px) {
    margin-right: 0;
    width: 72px;
  }
`

const HamburgerIcon = styled(MenuIcon)`
  width: 3rem;
  height: 1.2rem;
`

const LogoTitle = styled.h1`
  font-size: 1.56rem;
`

const DateText = styled.h2`
  margin: 0;
  font-size: 1.15rem;
  text-transform: uppercase;
`

const SwitchInput = styled.input`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`

const SwitchLabel = styled(Row)`
  position: relative;
  margin: 0 8px;
  width: 2.3rem;
  height: 1.13rem;
  border-radius: 0.5rem;
  background: rgb(0 0 0 / 50%);
  transition: background-color 300ms linear 0s;
  cursor: pointer;
`

const SwitchButton = styled.span`
  content: '';
  position: absolute;
  top: -0.16rem;
  left: 0;
  width: 1.35rem;
  height: 1.4rem;
  border-radius: 50%;
  background: rgb(43 36 77);
  box-shadow: rgba(0, 0, 255, 0.5) 0 0 0;
  transition: left 300ms linear 0s;
`

const SwitchItem = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
`

const LeftSection = styled(Cell)`
  @media screen and (max-width: 960px) {
    width: 100%;

    & > div {
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: 0 5fr;
    }
  }
`

const RightSection = styled(Cell)`
  place-self: center end;

  @media screen and (max-width: 960px) {
    place-self: center center;
  }
`

const Logo = () => (
  <Link to="/">
    <Row align="center" justify="center">
      <LogoIcon />
      <LogoTitle>Weatherio</LogoTitle>
    </Row>
  </Link>
)

const ThemeSwitch = () => {
  return (
    <Row align="center">
      <SwitchItem>Light</SwitchItem>
      <SwitchInput id="switch" type="checkbox" />
      <SwitchLabel
        as="label"
        htmlFor="switch"
        align="center"
        justify="space-between"
      >
        <SwitchButton />
      </SwitchLabel>
      <SwitchItem>Dark</SwitchItem>
    </Row>
  )
}

export const AppBar = ({ position = 'fixed' }: Props) => {
  return (
    <AppHeader position={position}>
      <Toolbar
        areas="'left-section date right-section'"
        places="center stretch"
        cols="0.6fr 1fr 0.5fr"
        rows="minmax(4rem, auto)"
      >
        <LeftSection area="left-section">
          <Row align="center">
            <IconButton aria-label="open drawer">
              <HamburgerIcon />
            </IconButton>
            <Logo />
          </Row>
        </LeftSection>
        <Cell area="date" place="center center">
          <DateText>{getTodaysDate()}</DateText>
        </Cell>
        <RightSection area="right-section">
          <ThemeSwitch />
        </RightSection>
      </Toolbar>
    </AppHeader>
  )
}
