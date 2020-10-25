import React from 'react'
import styled from 'styled-components'

import { Cell, Grid } from '~/ui/grid'
import { Row } from '~/ui/row'

type Props = {
  open: boolean
  onClose: (
    event: React.KeyboardEvent | React.MouseEvent | KeyboardEvent,
  ) => void
}

type PickedProps = Pick<Props, 'open'>

export const Drawer = ({ onClose, open = false }: Props) => {
  const handleKeyDown = React.useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose(event)
      }
    },
    [onClose],
  )

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)

    if (!open) {
      document.removeEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, open])

  return (
    <Modal open={open} role="presentation">
      <Row
        as={Backdrop}
        open={open}
        onClick={onClose}
        align="center"
        justify="center"
        aria-hidden="true"
      />
      <Grid
        as={Paper}
        open={open}
        areas="
          'header'
          'nav'
          'copyright'
        "
        rows="2fr 4fr 1fr"
        cols="1fr"
        gaps="1rem"
      >
        <Cell as={Header} area="header">
          <GreetingText>Welcome back</GreetingText>
          <Row as={Block} align="center">
            <ProfileImage>
              <img
                src="https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png"
                alt="Profile"
              />
            </ProfileImage>
            <AccountDetails>
              <AccountEmail>test@gmail.com</AccountEmail>
              <AccountPlan>Free Plan</AccountPlan>
            </AccountDetails>
          </Row>
        </Cell>
        <Cell as={Navigation} area="nav">
          <Row as={List} direction="column" align="stretch">
            <ListItem>Home</ListItem>
            <ListItem>Add City</ListItem>
            <ListItem>Logout</ListItem>
          </Row>
        </Cell>
        <Cell area="copyright" place="center">
          <span>Copyright © 2020 Weatherio</span>
        </Cell>
      </Grid>
    </Modal>
  )
}

const Modal = styled.aside<PickedProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: 1300;
  pointer-events: ${({ open }) => (open ? 'auto' : 'none')};
`

const Backdrop = styled.div<PickedProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0c1066;
  opacity: ${({ open }) => (open ? '0.4' : '0')};
  transition: opacity 0.3s linear;
  will-change: opacity;
  z-index: -1;
`

const Paper = styled.div<PickedProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 26rem;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.background.secondary};
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  transform: ${({ open }) => (open ? 'none' : 'translateX(-200%)')};
  transition: transform 0.3s linear;
  will-change: transform;
  z-index: 1200;
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

const ProfileImage = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
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

const List = styled.ul`
  margin: 1rem 0;
  padding-left: 2.5rem;
  height: 100%;
`

const ListItem = styled.li`
  display: block;
  margin: 0.5rem 0;
  padding: 1rem 0;
  border-bottom: 1px solid #495cfc;
  outline: none;
  cursor: pointer;
`
