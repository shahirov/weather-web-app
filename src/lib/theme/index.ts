import { DefaultTheme } from 'styled-components'

export const lightTheme: DefaultTheme = {
  colors: {
    background: {
      primary: 'linear-gradient(to top, #5ee7df 0, #66a6ff 100%)',
      secondary: '#fff',
      drawerHeader: 'linear-gradient(to right, #00ff9b, #5f84fb)',
      addCard: '#fff',
      detailsWrapper: 'linear-gradient(to top,#86dbff 0,#e0c3fc 100%)',
      circle:
        'linear-gradient(-225deg, #fff 0, #ffe29f 10%, #ffa99f 48%, #ffd1ff 100%)',
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
      addCard: 'linear-gradient(to bottom, #711b86, #00057a)',
      detailsWrapper: 'linear-gradient(#fc7db8, #495cfc)',
      circle: 'linear-gradient(to bottom, #ff8b8b, #6676ff)',
    },
    common: '#fff',
    text: '#fff',
    switchLabel: '#ff0070',
    switchButton: '#fff',
  },
}
