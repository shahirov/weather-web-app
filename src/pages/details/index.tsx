import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import styled from 'styled-components'

import BackIcon from '~/assets/icons/back-button.svg'
import Sun from '~/assets/icons/sun.svg'
import { Cell, Grid, Row } from '~/ui'

export const DetailsPage = ({ history }: RouteComponentProps) => {
  const handleClick = () => {
    history.goBack()
  }

  return (
    <Row as={Wrapper} direction="column" align="center" justify="center">
      <CircleBackground />
      <BackButton type="button" onClick={handleClick}>
        <BackIcon />
      </BackButton>
      <Card>
        <CardHeader>
          <Grid as={CardHeaderContent} rows="1fr" cols="1fr 1fr">
            <Cell as={CityWeatherInfo} place="center">
              <Row
                as={TemperatureStateContainer}
                direction="column"
                align="center"
                justify="center"
              >
                <TemperatureText>2°</TemperatureText>
                <WeatherState>Rain</WeatherState>
              </Row>
              <Row as={HumWindContainer} align="center">
                <Row
                  as={HumContainer}
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <HumText>Humidity</HumText>
                  <HumValue>86%</HumValue>
                </Row>
                <HumWindSeparator>&nbsp;</HumWindSeparator>
                <Row
                  as={WindContainer}
                  direction="column"
                  justify="center"
                  align="center"
                >
                  <WindText>Wind</WindText>
                  <WindValue>4 K/M</WindValue>
                </Row>
              </Row>
            </Cell>
            <Cell as={CityNameContainer} place="center">
              <CityNameUnderline>
                <CityNameText>Moscow</CityNameText>
              </CityNameUnderline>
            </Cell>
          </Grid>
        </CardHeader>
        <CardBody>
          <Row as={ForecastContainer} align="center" justify="center">
            {new Array(5).fill(true).map((_, index) => (
              <Row
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                as={DayWeatherContainer}
                direction="column"
                align="center"
                justify="center"
              >
                <DayWeatherText>Mon</DayWeatherText>
                <SunIcon />
                <DayTemperatureText>-2°</DayTemperatureText>
                <DayStateText>Clouds</DayStateText>
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
  background: linear-gradient(to top, #86dbff 0, #e0c3fc 100%);
`

const CircleBackground = styled.div`
  position: absolute;
  top: 50%;
  right: 0;
  width: 100rem;
  height: 100rem;
  background: linear-gradient(
    -225deg,
    #fff 0,
    #ffe29f 10%,
    #ffa99f 48%,
    #ffd1ff 100%
  );
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
`

const CardHeader = styled.div`
  position: relative;
  width: 100%;
  height: 31.88rem;
  overflow: hidden;
  border-radius: 1rem 1rem 0 0;
  background: linear-gradient(to bottom, #6666ab, #b28fb2, #fcb7b8);
`

const CardHeaderContent = styled.div`
  margin-top: 3rem;
  color: #fff;
`

const CityWeatherInfo = styled.div``

const TemperatureStateContainer = styled.div`
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

const WeatherState = styled.span`
  width: 100%;
  font-size: 1.3rem;
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  text-align: center;
`

const HumContainer = styled.div``

const HumText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`

const HumValue = styled.span``

const HumWindSeparator = styled.div`
  margin: 0 2rem;
  width: 2px;
  height: 2.5rem;
  background: #fff;
`

const WindContainer = styled.div``

const WindText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1rem;
  letter-spacing: 0.2rem;
  text-transform: uppercase;
`

const WindValue = styled.span``

const CityNameContainer = styled.div`
  padding-bottom: 35%;
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

const ForecastContainer = styled.div``

const DayWeatherContainer = styled.div`
  margin: 2rem 1.5rem;
`

const DayWeatherText = styled.span`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  text-transform: uppercase;
  color: #39437a;
`

const SunIcon = styled(Sun)`
  height: 4rem;
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
