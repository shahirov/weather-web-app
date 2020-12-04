import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { addCityToFirestore } from '~/api/cities'
import CheckMark from '~/assets/images/check.svg'
import favCityUrl from '~/assets/images/fav-city.jpg'
import { useAppDispatch } from '~/core/store'
import { selectUser } from '~/features/auth'
import {
  getUserCities,
  selectCities,
  selectIsFavotiteCityFollowed,
} from '~/features/cities'
import { SearchField } from '~/features/search/search-field'
import {
  getFavoriteCityWeather,
  resetSearchedCityWeatherData,
  selectFavoriteCityWeatherData,
  selectSearchedCityWeatherData,
  WeatherCard,
} from '~/features/weather'
import { getTodaysDate } from '~/lib/date-fns'
import { Cell, Grid, Row, WeatherIcon } from '~/ui'

export const AddPage = () => {
  const dispatch = useAppDispatch()
  const user = useSelector(selectUser)
  const cities = useSelector(selectCities)
  const favoriteCityWeatherData = useSelector(selectFavoriteCityWeatherData)
  const favoriteCityFollowed = useSelector(selectIsFavotiteCityFollowed)
  const searchedCityWeatherData = useSelector(selectSearchedCityWeatherData)
  const [cityAdded, setCityAdded] = React.useState(false)

  const temperature = favoriteCityWeatherData
    ? Math.ceil(favoriteCityWeatherData.main.temp)
    : ''
  const condition = favoriteCityWeatherData
    ? favoriteCityWeatherData.weather[0].main
    : ''

  React.useEffect(() => {
    if (cities.length === 0) {
      dispatch(getUserCities(user))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch])

  React.useEffect(() => {
    dispatch(getFavoriteCityWeather())
  }, [dispatch])

  React.useEffect(() => {
    let timeoutId: number

    if (cityAdded) {
      timeoutId = setTimeout(() => {
        setCityAdded(false)
        dispatch(resetSearchedCityWeatherData())
      }, 2500)
    }

    return () => {
      clearTimeout(timeoutId)
    }
  }, [cityAdded, dispatch])

  const addCity = async () => {
    if (searchedCityWeatherData) {
      await addCityToFirestore({
        user,
        id: searchedCityWeatherData.id,
        city: searchedCityWeatherData.name,
      })
      setCityAdded(true)
    }
  }

  const addFavoriteCity = async () => {
    if (favoriteCityWeatherData) {
      await addCityToFirestore({
        user,
        id: favoriteCityWeatherData.id,
        city: favoriteCityWeatherData.name,
      })
      dispatch(getUserCities(user))
    }
  }

  return (
    <Grid
      as={Paper}
      areas="
      'city-search fav-city'
    "
      cols="1fr 1fr"
    >
      <Cell style={{ overflowY: 'auto' }} area="city-search">
        <Row direction="column" align="center">
          <CitySearchTitle>Search cities</CitySearchTitle>
          <SearchField />
          <CitySearchHr>O O O</CitySearchHr>
        </Row>
        <Row as={CitySearchBody} justify="center">
          {searchedCityWeatherData && !cityAdded && (
            <WeatherCard
              cityName={searchedCityWeatherData.name}
              temperature={Math.ceil(searchedCityWeatherData.main.temp)}
              maxTemperature={Math.ceil(searchedCityWeatherData.main.temp_max)}
              minTemperature={Math.ceil(searchedCityWeatherData.main.temp_min)}
              condition={searchedCityWeatherData.weather[0].main}
              showActionButton
              onActionButtonClick={addCity}
            />
          )}
          {cityAdded && <SuccessMessage />}
        </Row>
      </Cell>
      <Cell as={FavoriteCityWrapper} area="fav-city">
        <FavoriteCityImage src={favCityUrl} alt="City of the month" />
        <FavoriteCityOverlay />
        <Row as={FavoriteCityHeader} direction="column" align="center">
          <FavoriteCityTitle>City of the month</FavoriteCityTitle>
          <FavoriteCityHr />
          <FavoriteCityDate>{getTodaysDate()}</FavoriteCityDate>
        </Row>
        <Row as={FavoriteCityBody} direction="column" align="center">
          <FavoriteCityWeatherIconContainer>
            <WeatherIcon
              condition={favoriteCityWeatherData?.weather[0].main || 'Sun'}
            />
          </FavoriteCityWeatherIconContainer>
          <Row as={FavoriteCityWeatherInfo} direction="column" align="center">
            <FavoriteCityTemperature>{temperature}°</FavoriteCityTemperature>
            <FavoriteCityName>
              Moscow <sub>RU</sub>
            </FavoriteCityName>
            <FavoriteCityCondition>{condition}</FavoriteCityCondition>
          </Row>
          {favoriteCityFollowed ? (
            <FollowedButton type="button" disabled>
              Followed
            </FollowedButton>
          ) : (
            <FollowButton type="button" onClick={addFavoriteCity}>
              Follow
            </FollowButton>
          )}
        </Row>
      </Cell>
    </Grid>
  )
}

const SuccessMessage = () => {
  return (
    <Note>
      <CheckMark />
      <Message>City has been successfully added!</Message>
    </Note>
  )
}

const Paper = styled.section`
  margin-top: 1rem;
  width: 90vw;
  height: 87vh;
  border-radius: 1rem;
  background: #fff;

  @media screen and (max-width: 960px) {
    grid-template-areas:
      'city-search'
      'fav-city';
    grid-template-columns: 1fr;
    height: auto;
    margin-bottom: 2rem;
  }
`

const CitySearchBody = styled.div``

const CitySearchTitle = styled.h3`
  margin: 4rem 0 3rem;
  font-size: 1.85rem;
  word-break: break-all;
  color: #0c1066;
  text-transform: uppercase;
`

const CitySearchHr = styled.span`
  margin: 2rem;
  color: #000;
  word-spacing: 1rem;
`

const FavoriteCityWrapper = styled.div`
  position: relative;
  border-radius: 0 1rem 1rem 0;
  overflow: hidden;
  color: #fff;
`

const FavoriteCityImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 0 1rem 1rem 0;

  @media screen and (max-width: 960px) {
    height: auto;
  }
`

const FavoriteCityOverlay = styled.div`
  width: 100%;
  min-height: 100%;
  position: absolute;
  border-radius: 0 1rem 1rem 0;
  background-color: rgb(43 36 77 /50%);
`

const FavoriteCityHeader = styled.div`
  position: relative;
  margin-top: 3rem;
`

const FavoriteCityTitle = styled.h3`
  font-size: 1.85rem;
  word-break: break-all;
  text-transform: uppercase;
`

const FavoriteCityHr = styled.hr`
  border: 0;
  width: 4rem;
  height: 2px;
  background: #fff;
`

const FavoriteCityDate = styled.span`
  font-size: 1.1rem;
`

const FavoriteCityBody = styled.div`
  position: relative;
  margin-top: 2rem;
`

const FavoriteCityWeatherIconContainer = styled.div`
  width: 9rem;
`

const FavoriteCityWeatherInfo = styled.div``

const FavoriteCityTemperature = styled.span`
  font-size: 5rem;
  text-align: center;
`

const FavoriteCityName = styled.span`
  font-size: 2rem;
  text-transform: uppercase;
`

const FavoriteCityCondition = styled.span`
  font-size: 1.1rem;
  text-transform: uppercase;
`

const BaseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  margin: 0;
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 0;
  font: inherit;
  font-weight: 700;
  border-radius: 3rem;
  color: #fff;
  outline: 0;
  cursor: pointer;
`

const FollowButton = styled(BaseButton)`
  border: 2px solid #fff;
  width: 8rem;
  height: 3.8rem;
  background: transparent;

  &:hover,
  &:focus {
    background: rgb(255 255 255 / 20%);
  }
`

const FollowedButton = styled(BaseButton)`
  border: none;
  width: 8.75rem;
  height: 3.8rem;
  background: rgb(255 255 255 / 60%);

  &:hover {
    background: rgb(255 255 255 / 20%);
  }

  &:disabled {
    cursor: default;
  }
`

const Note = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  animation: fade-in 1s ease-in-out;
  width: 100%;
`

export const Message = styled.span`
  display: block;
  margin-top: 1rem;
  font-size: 1.25rem;
  color: #000;
`
