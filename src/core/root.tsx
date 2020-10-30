import './init'

import React from 'react'
import styled from 'styled-components'

import { Routes } from '~/pages/routes'

export const Root = () => {
  return (
    <Main>
      <Routes />
    </Main>
  )
}

const Main = styled.main`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-basis: 100%;
  flex-direction: column;
  flex-grow: 1;
`
