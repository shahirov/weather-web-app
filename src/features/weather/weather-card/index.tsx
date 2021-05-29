import { useHistory } from 'react-router-dom'
import styled, { css } from 'styled-components'

import MaxArrow from '~/assets/images/max-arrow.svg'
import MinArrow from '~/assets/images/min-arrow.svg'
import { Button, Row, WeatherIcon } from '~/ui'

type Props = {
  cityName: string
  temperature: number
  condition: string
  minTemperature: number
  maxTemperature: number
  showActionButton?: boolean
  onActionButtonClick?: (event: React.MouseEvent) => void
}

export const WeatherCard = ({
  cityName,
  temperature,
  maxTemperature,
  minTemperature,
  condition,
  showActionButton = false,
  onActionButtonClick,
}: Props) => {
  const history = useHistory()

  const handleClick = () => {
    if (showActionButton) return
    history.push(`/details/${cityName.toLowerCase()}`)
  }

  return (
    <Row
      as={Card}
      onClick={handleClick}
      actionButtonShowed={showActionButton}
      direction="column"
      align="center"
    >
      <CityName>{cityName}</CityName>
      <WeatherIconContainer>
        <WeatherIcon condition={condition} />
      </WeatherIconContainer>
      <Row direction="column" align="center">
        <TemperatureMetric>{temperature}°</TemperatureMetric>
        <WeatherCondition>{condition}</WeatherCondition>
      </Row>
      <Row as={MinMaxContainer} align="center">
        <Row
          as={MinContainer}
          direction="column"
          align="center"
          justify="center"
        >
          <MinArrowIcon />
          <MinTemperatureText>{minTemperature}</MinTemperatureText>
          <MinText>Min</MinText>
        </Row>
        <Row
          as={MaxContainer}
          direction="column"
          align="center"
          justify="center"
        >
          <MaxArrowIcon />
          <MaxTemperatureText>{maxTemperature}</MaxTemperatureText>
          <MaxText>Max</MaxText>
        </Row>
      </Row>
      {showActionButton && (
        <ActionButton type="button" onClick={onActionButtonClick} inverse>
          Add City
        </ActionButton>
      )}
    </Row>
  )
}

const Card = styled.section<{ actionButtonShowed: boolean }>`
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
  cursor: ${({ actionButtonShowed }) => !actionButtonShowed && 'pointer'};
`

const CityName = styled.span`
  font-size: 1.4rem;
  text-transform: uppercase;
`

const WeatherIconContainer = styled.div`
  width: 10rem;
  margin-top: 2rem;
  margin-bottom: 1rem;

  & > svg {
    width: 10rem;
    height: 10rem;
  }
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
