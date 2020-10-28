import { createEffect, createEvent, createStore } from 'effector'

type Theme = 'light' | 'dark'

export const saveThemeFx = createEffect<Theme, void>((mode) =>
  window.localStorage.setItem('theme', JSON.stringify(mode)),
)

export const loadThemeFx = createEffect(
  () => JSON.parse(window.localStorage.getItem('theme') || 'light') as Theme,
)

export const toggleTheme = createEvent<React.ChangeEvent<HTMLInputElement>>()

export const $theme = createStore<Theme>('light')
