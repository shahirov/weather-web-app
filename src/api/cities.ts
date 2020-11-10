import axios, { AxiosError, AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { City, SortingType } from './types'

const instance = axios.create({
  baseURL: process.env.GEO_DB_CITIES_API_ENDPOINT,
})

export const getCitiesBySearchFx = createEffect<
  {
    cityNamePrefix: string
    sort?: SortingType
    offset?: number
    limit?: number
  },
  AxiosResponse<{ data: City[] }>,
  AxiosError
>(({ cityNamePrefix, sort = 'name', offset = 0, limit = 10 }) =>
  instance.get('geo/cities', {
    params: {
      namePrefix: cityNamePrefix,
      sort,
      offset,
      limit,
    },
  }),
)
