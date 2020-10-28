import './features/init'

import React from 'react'
import { render } from 'react-dom'
import { Router } from 'react-router-dom'

import { App } from './features/app'
import { AppGate } from './features/app/model'
import { history } from './lib/history'
import { Routes } from './pages/routes'

render(
  <Router history={history}>
    <AppGate />
    <App>
      <Routes />
    </App>
  </Router>,
  document.querySelector('#root'),
)
