/* eslint-disable react/jsx-props-no-spreading */
import React, { ComponentPropsWithRef } from 'react'
import styled from 'styled-components'

import { Row } from '~/ui/row'

export const Switch = ({
  name,
  checked,
  ...props
}: ComponentPropsWithRef<'input'>) => (
  <>
    <SwitchInput {...props} id={name} name={name} type="checkbox" />
    <Row as={SwitchLabel} htmlFor={name} align="center">
      <SwitchButton checked={checked} />
    </Row>
  </>
)

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

const SwitchButton = styled.span<{ checked?: boolean }>`
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
