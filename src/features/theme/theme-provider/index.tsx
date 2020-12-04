import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider as SThemeProvider } from 'styled-components'

import { selectTheme } from '~/features/theme/slice'
import { darkTheme, lightTheme } from '~/lib/theme'

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useSelector(selectTheme)

  return (
    <SThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </SThemeProvider>
  )
}
