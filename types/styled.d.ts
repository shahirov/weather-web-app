import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string
        secondary: string
        drawerHeader: string
      }
      common: string
      text: string
      switchLabel: string
      switchButton: string
    }
  }
}
