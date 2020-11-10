import { useStore } from 'effector-react'
import React from 'react'
import { ThemeProvider as SThemeProvider } from 'styled-components'

import { $theme } from '~/features/theme/model'
import { darkTheme, lightTheme } from '~/lib/theme'

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
