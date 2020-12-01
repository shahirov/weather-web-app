import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router } from 'react-router-dom'

import { App } from './app'
import { store } from './core'
import { checkAuthState } from './features/auth'
import { history } from './lib/history'

store.dispatch(checkAuthState())

render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.querySelector('#root'),
)
