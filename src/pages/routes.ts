import { AddPage } from './add'
import { DetailsPage } from './details'
import { Error404Page } from './error'
import { HomePage } from './home'
import { LoginPage } from './login'
import { path } from './paths'
import { SignupPage } from './signup'

export const routes = [
  {
    path: path.home(),
    component: HomePage,
    exact: true,
  },
  {
    path: path.login(),
    component: LoginPage,
    exact: true,
  },
  {
    path: path.signup(),
    component: SignupPage,
    exact: true,
  },
  {
    path: path.add(),
    component: AddPage,
    exact: true,
  },
  {
    path: path.details(':city'),
    component: DetailsPage,
    exact: true,
  },
  {
    path: '*',
    component: Error404Page,
  },
]
