import React from 'react'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'

import { AddPage } from '~/pages/add'
import { DetailsPage } from '~/pages/details'
import { HomePage } from '~/pages/home'
import { LoginPage } from '~/pages/login'
import { paths } from '~/pages/paths'
import { SignupPage } from '~/pages/signup'

export const filterRoutes = (isAuth: boolean) => (
  route: RouteConfig,
): boolean => {
  if (!route.forAuth) return true

  return route.forAuth === isAuth
}

export const makeRoutes = (isAuth: boolean): RouteConfig[] =>
  [
    {
      path: paths.home,
      exact: true,
      forAuth: true,
      component: HomePage,
    },
    {
      path: paths.home,
      exact: true,
      forAuth: false,
      component: () => <Redirect to={paths.login} />,
    },
    {
      path: paths.add,
      exact: true,
      forAuth: true,
      component: AddPage,
    },
    {
      path: paths.add,
      exact: true,
      forAuth: false,
      component: () => <Redirect to={paths.login} />,
    },
    {
      path: paths.details,
      exact: true,
      forAuth: true,
      component: DetailsPage,
    },
    {
      path: paths.details,
      exact: true,
      forAuth: false,
      component: () => <Redirect to={paths.login} />,
    },
    {
      path: paths.login,
      exact: true,
      forAuth: true,
      component: () => <Redirect to={paths.home} />,
    },
    {
      path: paths.login,
      exact: true,
      component: LoginPage,
    },
    {
      path: paths.signup,
      exact: true,
      forAuth: true,
      component: () => <Redirect to={paths.home} />,
    },
    {
      path: paths.signup,
      exact: true,
      component: SignupPage,
    },
  ].filter(filterRoutes(isAuth))
