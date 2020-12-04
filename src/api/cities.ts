import axios, { AxiosResponse } from 'axios'

import { database } from '~/lib/firebase'

import { CityModel, SortingType, SuggestedCity, UserProfile } from './types'

const API_ENDPOINT = 'http://geodb-free-service.wirefreethought.com/v1'

const citiesRef = database.collection('/cities')

const request = axios.create({
  baseURL: API_ENDPOINT,
})

export const fetchSuggestedCitiesByName = async ({
  cityNamePrefix,
  sort = 'name',
  offset = 0,
  limit = 10,
}: {
  cityNamePrefix: string
  sort?: SortingType
  offset?: number
  limit?: number
}): Promise<AxiosResponse<{ data: SuggestedCity[] }>> =>
  request.get('geo/cities', {
    params: {
      namePrefix: cityNamePrefix,
      sort,
      offset,
      limit,
    },
  })

export const fetchCities = async (
  user: UserProfile | null,
): Promise<Record<string, CityModel>> => {
  if (!user) return {}

  const documentRef = citiesRef.doc(user.id)
  const snapshot = await documentRef.get()
  const data = snapshot.data()

  if (!snapshot.exists || !data) {
    return {}
  }

  return data
}

export const addCityToFirestore = async ({
  user,
  city,
  id,
}: {
  user: UserProfile | null
  city: string
  id: number
}): Promise<void> => {
  if (!user || !city) return

  const documentRef = citiesRef.doc(user.id)

  await documentRef.set(
    {
      [city]: {
        name: city,
        id,
      },
    },
    { mergeFields: [city] },
  )
}
