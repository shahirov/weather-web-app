import { useStore } from 'effector-react'
import React from 'react'
import { ThemeProvider as SThemeProvider } from 'styled-components'

import { darkTheme, lightTheme } from '~/lib/theme'

import { $theme } from './model'

type Props = {
  children: React.ReactNode
}

export const ThemeProvider = ({ children }: Props) => {
  const theme = useStore($theme)

  return (
    <SThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      {children}
    </SThemeProvider>
  )
}
