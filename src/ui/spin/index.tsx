import React from 'react'
import styled from 'styled-components'

type Props = {
  tip: string
}

export const Spin = ({ tip }: Props) => {
  return (
    <>
      <SpinDot>
        <SpinDotItem />
        <SpinDotItem />
        <SpinDotItem />
        <SpinDotItem />
      </SpinDot>
      <SpinDotText>{tip}</SpinDotText>
    </>
  )
}

const SpinDot = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  display: inline-block;
  margin: -1rem;
  margin-top: -2rem;
  width: 1em;
  height: 1em;
  font-size: 2rem;
  transform: rotate(45deg);
  animation: rotate 1.2s infinite linear;
`

const SpinDotItem = styled.i`
  position: absolute;
  display: block;
  width: 0.88rem;
  height: 0.88rem;
  background: #1890ff;
  border-radius: 100%;
  transform: scale(0.75);
  transform-origin: 50% 50%;
  opacity: 0.3;
  animation: spin-move 1s infinite linear alternate;

  &:nth-child(1) {
    top: 0;
    left: 0;
  }

  &:nth-child(2) {
    top: 0;
    right: 0;
    animation-delay: 0.4s;
  }

  &:nth-child(3) {
    right: 0;
    bottom: 0;
    animation-delay: 0.8s;
  }

  &:nth-child(4) {
    bottom: 0;
    left: 0;
    animation-delay: 1.2s;
  }
`

const SpinDotText = styled.div`
  position: absolute;
  top: 50%;
  display: block;
  width: 100%;
  padding-top: 0.31rem;
  text-align: center;
  text-shadow: 0 1px 2px #fff;
`
