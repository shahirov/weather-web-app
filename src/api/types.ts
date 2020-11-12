export type Params = URLSearchParams | string | { [key: string]: string }

export type UnitMeasurement = 'metric' | 'imperial'

export type User = {
  id: string
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

export type WeatherData = {
  coord: {
    lon: number
    lat: number
  }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    message: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export type ForecastData = {
  cod: string
  message: number
  cnt: number
  list: Array<{
    dt: number
    main: {
      temp: number
      feels_like: number
      temp_min: number
      temp_max: number
      pressure: number
      sea_level: number
      grnd_level: number
      humidity: number
      temp_kf: number
    }
    weather: Array<{
      id: number
      main: string
      description: string
      icon: string
    }>
    clouds: {
      all: number
    }
    wind: {
      speed: number
      deg: number
    }
    visibility: number
    pop: number
    sys: {
      pod: string
    }
    dt_txt: string
    rain: {
      '3h': number
    }
  }>
  city: {
    id: number
    name: string
    coord: {
      lat: number
      lon: number
    }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}
