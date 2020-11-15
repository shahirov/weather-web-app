import { useGate, useStore } from 'effector-react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'

import MaxArrow from '~/assets/icons/max-arrow.svg'
import MinArrow from '~/assets/icons/min-arrow.svg'
import Sun from '~/assets/icons/sun.svg'
import { $citiesWeatherData, addCity, InitGate } from '~/features/weather/model'
import { Button } from '~/ui/button'
import { Row } from '~/ui/row'

type Props = {
  cityName: string
  showActionButton?: boolean
}

export const WeatherCard = ({ cityName, showActionButton = false }: Props) => {
  useGate(InitGate, cityName)

  const history = useHistory()
  const citiesWeatherData = useStore($citiesWeatherData)
  const cityWeatherData = citiesWeatherData[cityName]

  if (
    Object.values(citiesWeatherData).length === 0 ||
    cityWeatherData === undefined
  ) {
    return null
  }

  const handleClick = () => {
    history.push(`/details/${cityName.toLowerCase()}`)
  }

  const { name, main, weather } = cityWeatherData

  return (
    <Row as={Card} onClick={handleClick} direction="column" align="center">
      <CityName>{name}</CityName>
      <WeatherIconContainer>
        <Sun />
      </WeatherIconContainer>
      <Row direction="column" align="center">
        <TemperatureMetric>{Math.round(main.temp)}°</TemperatureMetric>
        <WeatherCondition>{weather[0].main}</WeatherCondition>
      </Row>
      <Row as={MinMaxContainer} align="center">
        <Row
          as={MinContainer}
          direction="column"
          align="center"
          justify="center"
        >
          <MinArrowIcon />
          <MinTemperatureText>{Math.round(main.temp_min)}</MinTemperatureText>
          <MinText>Min</MinText>
        </Row>
        <Row
          as={MaxContainer}
          direction="column"
          align="center"
          justify="center"
        >
          <MaxArrowIcon />
          <MaxTemperatureText>{Math.round(main.temp_max)}</MaxTemperatureText>
          <MaxText>Max</MaxText>
        </Row>
      </Row>
      {showActionButton && (
        <ActionButton type="button" onClick={addCity} inverse>
          Add City
        </ActionButton>
      )}
    </Row>
  )
}

const Card = styled.section`
  position: relative;
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

const CityName = styled.span`
  font-size: 1.4rem;
  text-transform: uppercase;
`

const WeatherIconContainer = styled.div`
  width: 10rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
`

const TemperatureMetric = styled.span`
  font-size: 3rem;
`

const WeatherCondition = styled.span`
  font-size: 1.2rem;
  text-transform: uppercase;
`

const MinMaxContainer = styled.div`
  margin-top: 2rem;
  width: 100%;
`

const MinContainer = styled.div`
  flex-grow: 1;
`

const MaxContainer = styled.div`
  flex-grow: 1;
`

const ArrowIconStyles = css`
  margin: auto;
  height: 1.25rem;
`

const MinArrowIcon = styled(MinArrow)`
  ${ArrowIconStyles};
`

const MaxArrowIcon = styled(MaxArrow)`
  ${ArrowIconStyles};
`

const TemperatureTextStyles = css`
  font-size: 2rem;
  text-align: center;
`

const MinTemperatureText = styled.span`
  ${TemperatureTextStyles};
`

const MaxTemperatureText = styled.span`
  ${TemperatureTextStyles};
`

const MinText = styled.span`
  text-align: center;
  color: #00ff9b;
`

const MaxText = styled.span`
  text-align: center;
  color: #ff0000;
`

const ActionButton = styled(Button)`
  position: absolute;
  left: 50%;
  bottom: 6px;
  transform: translate(-50%, 0);
`
