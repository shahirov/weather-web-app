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
    switch (param.toLowerCase()) {
      case 'clouds':
        return <Clouds />
      case 'rain':
        return <Rain />
      case 'drizzle':
        return <Rain />
      case 'mist':
        return <Rain />
      case 'haze':
        return <Fog />
      case 'fog':
        return <Fog />
      case 'storm':
        return <Storm />
      case 'thunderstorm':
        return <Storm />
      default:
        return <Sun />
    }
  }

  return <>{renderIcon(condition)}</>
}
