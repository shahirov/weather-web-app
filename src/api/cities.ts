import axios, { AxiosError, AxiosResponse } from 'axios'
import { createEffect } from 'effector'

import { database, firebase } from '~/lib/firebase'

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
}: {
  user: UserProfile | null
  city: SuggestedCity | null
}): Promise<void> => {
  if (!user || !city) return

  const documentRef = citiesRef.doc(user.id)

  await documentRef.set(
    {
      [city.name]: {
        id: city.id,
        name: city.name,
      },
    },
    { mergeFields: [city.name] },
  )
}

// Effector
export const getSuggestedCitiesByNameFx = createEffect<
  {
    cityNamePrefix: string
    sort?: SortingType
    offset?: number
    limit?: number
  },
  AxiosResponse<{ data: SuggestedCity[] }>,
  AxiosError
>(({ cityNamePrefix, sort = 'name', offset = 0, limit = 10 }) =>
  request.get('geo/cities', {
    params: {
      namePrefix: cityNamePrefix,
      sort,
      offset,
      limit,
    },
  }),
)

export const getCitiesFx = createEffect<
  { user: UserProfile | null },
  Record<string, CityModel>,
  firebase.firestore.FirestoreError
>(async ({ user }) => {
  if (!user) return {}

  const documentRef = citiesRef.doc(user.id)
  const snapshot = await documentRef.get()
  const data = snapshot.data()

  if (!snapshot.exists || !data) {
    return {}
  }

  return data
})

export const addCityFx = createEffect<
  { user: UserProfile | null; city: SuggestedCity | null },
  void,
  firebase.firestore.FirestoreError
>(async ({ user, city }) => {
  if (!user || !city) return

  const documentRef = citiesRef.doc(user.id)

  await documentRef.set(
    {
      [city.name]: {
        id: city.id,
        name: city.name,
        createdAt: new Date(),
      },
    },
    { mergeFields: [city.name] },
  )
})
