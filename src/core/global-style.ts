import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export const GlobalStyle = createGlobalStyle`
  ${normalize};

  html {
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    font-family: 'Bree Serif', serif;
    font-size: 16px;
    line-height: 1.5;
    letter-spacing: 0.1rem;
    color: ${({ theme }) => (theme ? theme.colors.text : '#000')};
    background: ${({ theme }) =>
      theme ? theme.colors.background.primary : '#fff'};
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

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
  }

  p {
    margin: 0;
  }

  ul,
  ol,
  li {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  img {
    width: 100%;
    height: auto;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slide-down {
    from {
      transform: translateY(-25%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-up {
    from {
      transform: translateY(50%);
    }
    to {
      transform: translateY(0);
    }
  }

  @keyframes slide-right {
    from {
      transform: translateX(-50%);
    }
    to {
      transform: translateX(0);
    }
  }

  @keyframes scale-up {
    from {
      transform: scale(0);
    }
    to {
      transform: scale(1);
    }
  }

  @keyframes scale-up-circle {
    from {
      transform-origin: top;
      transform: scale(0) translateY(-50%) rotate(0deg);
    }
    to {
      transform-origin: center;
      transform: scale(1) translateY(-50%) rotate(360deg);
    }
  }

  @keyframes rotate {
    to {
      transform: rotate(405deg);
    }
  }

  @keyframes spin-move {
    to {
      opacity: 1;
    }
  }
`
