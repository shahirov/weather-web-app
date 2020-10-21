import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize};

  html {
    box-sizing: border-box;
    width: 100vw;
    min-height: 100vh;
    font-family: 'Bree Serif', serif;
    color: #fff;
    background: linear-gradient(
      to top,
      rgb(94, 231, 223) 0px,
      rgb(102, 166, 255) 100%
    );
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  /* Inherit link color */
  a {
    color: inherit;
    text-decoration: none;
  }
`
