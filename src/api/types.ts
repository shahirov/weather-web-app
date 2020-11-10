export type UserDocumentData = {
  email: string
  photoUrl: string
  createdAt: Date
}

export type SortingType = 'countryCode' | 'elevation' | 'name' | 'population'

export type City = {
  city: string
  country: string
  countryCode: string
  id: number
  latitude: number
  longitude: number
  name: string
  region: string
  regionCode: string
  type: string
  wikiDataId: string
}
