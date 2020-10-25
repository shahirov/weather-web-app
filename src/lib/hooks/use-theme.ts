/* eslint-disable @typescript-eslint/no-unused-expressions */
import { useEffect, useState } from 'react'

type ThemeType = 'light' | 'dark'

type ThemeProps = [ThemeType, () => void, boolean]

export const useTheme = (): ThemeProps => {
  const [theme, setTheme] = useState<ThemeType>('light')
  const [componentMounted, setComponentMounted] = useState(false)

  const setMode = (mode: ThemeType) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
  }

  const toggleTheme = () => {
    theme === 'light' ? setMode('dark') : setMode('light')
  }

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme')
    localTheme && setTheme(localTheme as ThemeType)
    setComponentMounted(true)
  }, [])

  return [theme, toggleTheme, componentMounted]
}
