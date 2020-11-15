import { useGate, useList, useStore } from 'effector-react'
import React from 'react'
import styled, { css } from 'styled-components'

import DarkCity from '~/assets/city-illustration-dark.svg'
import LightCity from '~/assets/city-illustration-light.svg'
import DarkAdd from '~/assets/icons/add-dark.svg'
import LightAdd from '~/assets/icons/add-light.svg'
import { $cities } from '~/features/cities'
import { $theme } from '~/features/theme'
import { WeatherCard } from '~/features/weather'
import { history } from '~/lib/history'
import { paths } from '~/pages/paths'
import { Row } from '~/ui'

import { HomePageGate } from './model'

const handleClick = () => {
  history.push(paths.add)
}

export const HomePage = () => {
  useGate(HomePageGate)

  const theme = useStore($theme)

  return (
    <Row as={Container} align="center" justify="center">
      {useList($cities, (city) => (
        <WeatherCard cityName={city.name} />
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
