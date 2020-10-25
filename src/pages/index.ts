import { renderRoutes } from 'react-router-config'

import { routes } from './routes'

export const Pages = (): JSX.Element => renderRoutes(routes)
