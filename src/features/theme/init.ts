import { forward } from 'effector'

import { $theme, loadThemeFx, saveThemeFx, toggleTheme } from './model'

$theme
  .on(loadThemeFx.doneData, (_, theme) => theme)
  .on(toggleTheme, (theme) => (theme === 'light' ? 'dark' : 'light'))

forward({
  from: $theme,
  to: saveThemeFx,
})
