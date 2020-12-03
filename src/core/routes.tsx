import React from 'react'
import { RouteConfig } from 'react-router-config'
import { Redirect } from 'react-router-dom'

import { AddPage, DetailsPage, HomePage, LoginPage, SignupPage } from '~/pages'

const filterRoutes = (isAuth: boolean) => (route: RouteConfig): boolean => {
  if (!route.forAuth) return true

  return route.forAuth === isAuth
}

export const makeRoutes = (isAuth: boolean): RouteConfig[] =>
  [
    {
      path: '/',
      exact: true,
      forAuth: true,
      component: HomePage,
    },
    {
      path: '/',
      exact: true,
      forAuth: false,
      component: () => <Redirect to="/login" />,
    },
    {
      path: '/add',
      exact: true,
      forAuth: true,
      component: AddPage,
    },
    {
      path: '/add',
      exact: true,
      forAuth: false,
      component: () => <Redirect to="/login" />,
    },
    {
      path: '/details/:cityName',
      exact: true,
      forAuth: true,
      component: DetailsPage,
    },
    {
      path: '/details/:city',
      exact: true,
      forAuth: false,
      component: () => <Redirect to="/login" />,
    },
    {
      path: '/login',
      exact: true,
      forAuth: true,
      component: () => <Redirect to="/" />,
    },
    {
      path: '/login',
      exact: true,
      forAuth: false,
      component: LoginPage,
    },
    {
      path: '/signup',
      exact: true,
      forAuth: true,
      component: () => <Redirect to="/" />,
    },
    {
      path: '/signup',
      exact: true,
      forAuth: false,
      component: SignupPage,
    },
  ].filter(filterRoutes(isAuth))
