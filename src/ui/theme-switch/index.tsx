import React from 'react'
import styled from 'styled-components'

import { Row } from '~/ui/row'

type Props = Partial<{
  checked: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}>

export const ThemeSwitch = ({ onChange, checked = false }: Props) => {
  return (
    <Row align="center">
      <SwitchItem>Light</SwitchItem>
      <SwitchInput
        id="switch"
        type="checkbox"
        checked={checked}
        onChange={onChange}
      />
      <Row as={SwitchLabel} htmlFor="switch" align="center">
        <SwitchButton checked={checked} />
      </Row>
      <SwitchItem>Dark</SwitchItem>
    </Row>
  )
}

const SwitchInput = styled.input`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`

const SwitchLabel = styled.label`
  position: relative;
  margin: 0 8px;
  width: 2.3rem;
  height: 1.13rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors.switchLabel};
  transition: background-color 300ms linear 0s;
  cursor: pointer;
`

const SwitchButton = styled.span<Props>`
  content: '';
  position: absolute;
  top: -0.14rem;
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.switchButton};
  box-shadow: rgba(0, 0, 255, 0.5) 0 0 0;
  transition: left 0.3s linear 0s;

  left: ${({ checked }) => (checked ? '1rem' : 0)};
`

const SwitchItem = styled.span`
  font-size: 1rem;
  text-transform: uppercase;
`
