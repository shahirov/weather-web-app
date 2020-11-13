import styled, { css } from 'styled-components'

type Props = {
  small?: boolean
  inverse?: boolean
}

export const Button = styled.button<Props>`
  display: flex;
  align-items: stretch;
  justify-content: center;
  margin-top: 1.5rem;
  padding: 1rem 4rem;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.7rem;
  border-radius: 2rem;
  color: #fff;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  border: none;
  outline: none;
  cursor: pointer;

  ${({ inverse }) =>
    inverse
      ? css`
          background: #2b244d;

          &:hover {
            background: #00ff9b;
          }
        `
      : css`
          background: #00ff9b;

          &:hover {
            background: linear-gradient(to right, #03a9f4, #00ff9b);
          }
        `}

  &:disabled {
    background: #d3d3d3;
    cursor: default;
  }
`
