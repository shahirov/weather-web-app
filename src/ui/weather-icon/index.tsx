import React from 'react'

import Clouds from '~/assets/images/clouds.svg'
import Fog from '~/assets/images/fog.svg'
import Rain from '~/assets/images/rain.svg'
import Storm from '~/assets/images/storm.svg'
import Sun from '~/assets/images/sun.svg'

type Props = {
  condition: string
}

export const WeatherIcon = ({ condition }: Props) => {
  const renderIcon = (param: string) => {
    switch (param) {
      case 'Clouds':
        return <Clouds />
      case 'Rain' || 'Drizzle' || 'Mist':
        return <Rain />
      case 'Haze' || 'Fog':
        return <Fog />
      case 'Storm' || 'Thunderstorm':
        return <Storm />
      default:
        return <Sun />
    }
  }

  return <>{renderIcon(condition)}</>
}
