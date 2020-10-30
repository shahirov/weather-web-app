import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { AddPage } from '~/pages/add'
import { DetailsPage } from '~/pages/details'
import { Error404Page } from '~/pages/error'
import { HomePage } from '~/pages/home'
import { LoginPage } from '~/pages/login'
import { SignupPage } from '~/pages/signup'

import { paths } from './paths'

export const Routes = () => {
  return (
    <Switch>
      <Route exact path={paths.home()} component={HomePage} />
      <Route exact path={paths.add()} component={AddPage} />
      <Route exact path={paths.details(':city')} component={DetailsPage} />
      <Route exact path={paths.signup()} component={SignupPage} />
      <Route exact path={paths.login()} component={LoginPage} />
      <Route path="*" component={Error404Page} />
    </Switch>
  )
}
