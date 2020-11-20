import { useGate, useStore } from 'effector-react'
import React from 'react'
import { RouteComponentProps, useParams } from 'react-router-dom'
import styled from 'styled-components'

import BackIcon from '~/assets/icons/back-button.svg'
import { Cell, Grid, Row, WeatherIcon } from '~/ui'

import { $cityWeatherData, $daysForecastData, DetailsPageGate } from './model'

export const DetailsPage = ({ history }: RouteComponentProps) => {
  const { city } = useParams<{ city: string }>()

  useGate(DetailsPageGate, city)

  const weatherData = useStore($cityWeatherData)
  const forecastData = useStore($daysForecastData)

  const handleClick = () => {
    history.goBack()
  }

  const temperature = weatherData?.temperature
  const condition = weatherData?.condition
  const wind = weatherData?.wind
  const humidity = weatherData?.humidity

  return (
    <Row as={Wrapper} direction="column" align="center" justify="center">
      <CircleBackground />
      <BackButton type="button" onClick={handleClick}>
        <BackIcon />
      </BackButton>
      <Card>
        <CardHeader>
          <Grid as={CardHeaderContent} rows="1fr" cols="1fr 1fr">
            <Cell place="center">
              <Row
                as={TemperatureConditionContainer}
                direction="column"
                align="center"
                justify="center"
              >
                <TemperatureText>{temperature}°</TemperatureText>
                <WeatherCondition>{condition}</WeatherCondition>
              </Row>
              <Row as={HumWindContainer} align="center">
                <Row direction="column" justify="center" align="center">
                  <HumText>Humidity</HumText>
                  <span>{humidity}%</span>
                </Row>
                <HumWindSeparator>&nbsp;</HumWindSeparator>
                <Row direction="column" justify="center" align="center">
                  <WindText>Wind</WindText>
                  <span>{wind} K/M</span>
                </Row>
              </Row>
            </Cell>
            <Cell as={CityNameContainer} place="center">
              <CityNameUnderline>
                <CityNameText>{city}</CityNameText>
              </CityNameUnderline>
            </Cell>
          </Grid>
        </CardHeader>
        <CardBody>
          <Row align="center" justify="space-around">
            {forecastData &&
              Object.entries(forecastData).map(([day, data]) => (
                <Row
                  key={day}
                  as={DayWeatherContainer}
                  direction="column"
                  align="center"
                  justify="center"
                >
                  <DayWeatherText>{day}</DayWeatherText>
                  <WeatherIconContainer>
                    <WeatherIcon condition={data.condition} />
                  </WeatherIconContainer>
                  <DayTemperatureText>{data.temperature}°</DayTemperatureText>
                  <DayStateText>{data.condition}</DayStateText>
                </Row>
              ))}
          </Row>
        </CardBody>
      </Card>
    </Row>
  )
}

const Wrapper = styled.div`
  position: relative;
  padding: 2rem 0;
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background.detailsWrapper};
`

const CircleBackground = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  width: 100rem;
  height: 100rem;
  background: ${({ theme }) => theme.colors.background.circle};
  border-radius: 50%;
  animation: 0.9s ease-in-out forwards scale-up-circle;
  transition: background 1s ease-in-out;
  z-index: 1;
`

const BackButton = styled.button`
  position: absolute;
  top: 3rem;
  left: 3.25rem;
  border: none;
  margin: 0;
  margin-top: 2rem;
  padding: 0;
  width: 5rem;
  font: inherit;
  font-weight: 700;
  background: transparent;
  cursor: pointer;
  z-index: 2;

  @media screen and (max-width: 960px) {
    position: static;
    top: 1rem;
    margin-bottom: 1rem;
  }
`

const Card = styled.section`
  position: relative;
  width: 75%;
  height: 80%;
  background: #fff;
  border-radius: 1rem;
  animation: 1s ease-out 0.3s scale-up, 1.25s ease-out 0.3s forwards fade-in;
  z-index: 3;

  @media screen and (max-width: 960px) {
    width: 85%;
  }
`

const CardHeader = styled.div`
  position: relative;
  width: 100%;
  height: 31.88rem;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  background: linear-gradient(to bottom, #6666ab, #b28fb2, #fcb7b8);

  @media screen and (max-width: 960px) {
    height: auto;
  }
`

const CardHeaderContent = styled.div`
  margin-top: 3rem;
  color: #fff;

  @media screen and (max-width: 960px) {
    margin-top: 2rem;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr;
  }
`

const TemperatureConditionContainer = styled.div`
  width: 100%;
`

const HumWindContainer = styled.div`
  margin-top: 2rem;
  padding-right: 3rem;
`

const TemperatureText = styled.span`
  width: 100%;
  font-size: 6rem;
  text-align: center;
`

const WeatherCondition = styled.span`
  width: 100%;
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  text-align: center;
`

const HumText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`

const HumWindSeparator = styled.div`
  margin: 0 2rem;
  width: 2px;
  height: 2.5rem;
  background: #fff;
`

const WindText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`

const CityNameContainer = styled.div`
  padding-bottom: 35%;

  @media screen and (max-width: 960px) {
    padding-bottom: 22%;
  }
`

const CityNameUnderline = styled.div`
  background: 0 0;
  border-radius: 5px;
  height: 5px;
  box-shadow: 0 4rem 0 0 #fff;
`

const CityNameText = styled.span`
  padding-bottom: 2rem;
  font-size: 2rem;
  letter-spacing: 0.3rem;
  text-transform: uppercase;
`

const CardBody = styled.div`
  width: 100%;
  padding: 2rem;
`

const DayWeatherContainer = styled.div`
  margin: 2rem 1.5rem;
`

const WeatherIconContainer = styled.div`
  width: 4rem;
  height: 4rem;
`

const DayWeatherText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #39437a;
`

const DayTemperatureText = styled.span`
  padding-left: 0.35rem;
  margin: 0.75rem 0;
  font-size: 1.85rem;
  letter-spacing: 0.25rem;
  text-align: center;
  color: #0c1066;
`

const DayStateText = styled.span`
  font-size: 0.85rem;
  letter-spacing: 0.2rem;
  color: #2b244d;
  text-transform: uppercase;
`
