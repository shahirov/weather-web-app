import React from 'react'
import styled from 'styled-components'

import { Grid, GridProps } from '~/ui/grid'
import { Row } from '~/ui/row'

type Props = GridProps & {
  children: React.ReactNode
  open: boolean
  onClose: (
    event: React.KeyboardEvent | React.MouseEvent | KeyboardEvent,
  ) => void
}

type PickedProps = Pick<Props, 'open'>

export const Drawer = ({
  children,
  onClose,
  areas,
  rows,
  cols,
  gaps,
  open = false,
}: Props) => {
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
        areas={areas}
        rows={rows}
        cols={cols}
        gaps={gaps}
      >
        {children}
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
  background: ${({ theme }) => theme.colors.background.secondary || '#fff'};
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  transform: ${({ open }) => (open ? 'none' : 'translateX(-200%)')};
  transition: transform 0.3s linear;
  will-change: transform;
  z-index: 1200;
`
