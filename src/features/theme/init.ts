import { forward } from 'effector'

import { $theme, loadThemeFx, saveThemeFx, toggleTheme } from './model'

$theme
  .on([loadThemeFx.doneData], (_, theme) => theme)
  .on(toggleTheme, (_, event) => {
    const { checked } = event.currentTarget

    if (checked) return 'dark'
    return 'light'
  })

forward({
  from: $theme,
  to: saveThemeFx,
})
