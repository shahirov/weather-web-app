import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'

import { GlobalStyle } from '~/core'
import { history } from '~/lib/history'

import { App } from './app'

render(
  <Router history={history}>
    <GlobalStyle />
    <App />
  </Router>,
  document.querySelector('#root'),
)
