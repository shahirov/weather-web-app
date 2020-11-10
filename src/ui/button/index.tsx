import styled from 'styled-components'

export const Button = styled.button`
  margin-top: 1.5rem;
  padding: 1rem;
  width: 60%;
  font-size: 1.2rem;
  line-height: 1.7rem;
  border-radius: 2rem;
  color: #fff;
  background: #00ff9b;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.1);
  border: none;
  outline: none;
  cursor: pointer;

  &:hover,
  &:focus {
    background: linear-gradient(to right, #03a9f4, #00ff9b);
  }

  &:disabled {
    background: #d3d3d3;
    cursor: default;
  }
`
