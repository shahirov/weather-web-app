import React from 'react'
import styled from 'styled-components'

import { Grid } from '~/ui/grid'

type Props = {
  children: React.ReactNode
}

export const Toolbar = ({ children }: Props) => {
  return (
    <Grid
      as={StyledToolbar}
      areas="'left-section date right-section'"
      places="center stretch"
      cols="0.6fr 1fr 0.5fr"
      rows="minmax(4rem, auto)"
    >
      {children}
    </Grid>
  )
}

const StyledToolbar = styled.div`
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
