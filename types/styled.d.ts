import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: {
        primary: string
        secondary: string
        drawerHeader: string
        addCard: string
        detailsWrapper: string
        circle: string
      }
      common: string
      text: string
      switchLabel: string
      switchButton: string
    }
  }
}
