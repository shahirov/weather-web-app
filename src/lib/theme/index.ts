import { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  colors: {
    background: {
      primary: 'linear-gradient(to top, #5ee7df 0, #66a6ff 100%)',
      secondary: '#fff',
      drawerHeader: 'linear-gradient(to right, #00ff9b, #5f84fb)',
    },
    text: '#000',
    common: '#000',
    switchLabel: 'rgba(0, 0, 0, 0.5);',
    switchButton: '#2b244d',
  },
}

export const darkTheme: DefaultTheme = {
  colors: {
    background: {
      primary: 'linear-gradient(to bottom, #372865, #000)',
      secondary: '#2b244d',
      drawerHeader: 'linear-gradient(to top, #30cfd0 0, #330867 100%)',
    },
    common: '#fff',
    text: '#fff',
    switchLabel: '#ff0070',
    switchButton: '#fff',
  },
}
