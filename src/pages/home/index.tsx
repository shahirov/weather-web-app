import React from 'react'
import { useSelector } from 'react-redux'
import styled, { css } from 'styled-components'

import { CityModel } from '~/api/types'
import DarkAdd from '~/assets/images/add-dark.svg'
import LightAdd from '~/assets/images/add-light.svg'
import DarkCity from '~/assets/images/city-illustration-dark.svg'
import LightCity from '~/assets/images/city-illustration-light.svg'
import { useAppDispatch } from '~/core/store'
import { selectUser } from '~/features/auth'
import { getUserCities } from '~/features/cities'
import { selectTheme } from '~/features/theme'
import {
  getCitiesWeather,
  resetCitiesWeatherData,
  selectCitiesWeatherData,
  WeatherCard,
} from '~/features/weather'
import { history } from '~/lib/history'
import { Row } from '~/ui'

const handleClick = () => {
  history.push('/add')
}

export const HomePage = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectUser)
  const citiesWeatherData = useSelector(selectCitiesWeatherData)
  const theme = useSelector(selectTheme)

  React.useEffect(() => {
    dispatch(getUserCities(user)).then((action) => {
      const cities = action.payload as Record<string, CityModel>
      dispatch(getCitiesWeather({ cities: Object.values(cities) }))
    })

    return () => {
      dispatch(resetCitiesWeatherData())
    }
  }, [user, dispatch])

  return (
    <Row as={Container} align="center" justify="center">
      {citiesWeatherData.map(([cityName, data]) => (
        <WeatherCard
          key={data.id}
          cityName={cityName}
          temperature={Math.ceil(data.main.temp)}
          minTemperature={Math.ceil(data.main.temp_min)}
          maxTemperature={Math.ceil(data.main.temp_max)}
          condition={data.weather[0].main}
        />
      ))}
      <AddCard onClick={handleClick}>
        <CardTitle>Add City</CardTitle>
        <Row direction="column" align="center">
          {theme === 'light' ? (
            <>
              <LightAddIcon />
              <LightCityIllustration />
            </>
          ) : (
            <>
              <DarkAddIcon />
              <DarkCityIllustration />
            </>
          )}
        </Row>
      </AddCard>
    </Row>
  )
}

const Container = styled.div`
  min-height: 90vh;
`

const AddCard = styled.div`
  margin: 2rem;
  padding: 2rem;
  width: 25rem;
  height: 36rem;
  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.background.addCard};
  box-shadow: 0 0 2rem rgb(0 0 255 / 10%);
  border-radius: 1.75rem;
  animation: 1s ease-in-out slide-up, 1.5s ease-in-out fade-in;
  cursor: pointer;
`

const CardTitle = styled.span`
  display: block;
  margin-bottom: 1rem;
  text-align: center;
  text-transform: uppercase;
`

const AddIconStyles = css`
  width: 11rem;
  margin-bottom: 1.15rem;
`

const CityIllustrationStyles = css`
  width: 21rem;
`

const LightAddIcon = styled(LightAdd)`
  ${AddIconStyles};
`

const DarkAddIcon = styled(DarkAdd)`
  ${AddIconStyles};
`

const LightCityIllustration = styled(LightCity)`
  ${CityIllustrationStyles};
`

const DarkCityIllustration = styled(DarkCity)`
  ${CityIllustrationStyles};
`
