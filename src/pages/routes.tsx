/* eslint-disable react/jsx-props-no-spreading */
import { useStore } from 'effector-react'
import React from 'react'
import { Redirect, Route, RouteProps, Switch } from 'react-router-dom'

import { $user } from '~/features/auth/model'
import { AddPage } from '~/pages/add'
import { DetailsPage } from '~/pages/details'
import { Error404Page } from '~/pages/error'
import { HomePage } from '~/pages/home'
import { LoginPage } from '~/pages/login'
import { SignupPage } from '~/pages/signup'

import { paths } from './paths'

type Props = RouteProps

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PrivateRoute = ({ component: Component, location, ...props }: Props) => {
  const isAuthenticated = useStore($user)

  return isAuthenticated ? (
    <Route {...props} location={location} component={Component} />
  ) : (
    <Redirect to={{ pathname: paths.login(), state: location }} />
  )
}

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
