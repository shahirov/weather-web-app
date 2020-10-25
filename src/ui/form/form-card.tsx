import React from 'react'
import styled from 'styled-components'

import { Row } from '~/ui/row'

type Props = {
  title: string
  text: string
  children: React.ReactNode
}

export const FormCard = ({ children, title, text }: Props) => {
  return (
    <Card>
      <Row as={Content} direction="column" justify="start" align="center">
        <Header>{title}</Header>
        {children}
      </Row>
      <Row as={Aside} direction="column" justify="end">
        <Overlay />
        <Text>{text}</Text>
        <Hr />
      </Row>
    </Card>
  )
}

const Card = styled.div`
  position: relative;
  display: flex;
  width: 85%;
  min-height: 80vh;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  animation: 1s ease-in-out fade-in;
`

const Content = styled.div`
  flex: 2 2;
  min-height: 100%;
  animation: 1.5s ease-in-out fade-in;
`

const Aside = styled.aside`
  position: relative;
  flex: 3 3;
  min-height: 100%;
  border-radius: 0 10px 10px 0;
  background: url('https://source.unsplash.com/random/1200x900?mountain)')
    center center/cover no-repeat;
  animation: 2.25s ease-in-out fade-in;

  @media screen and (max-width: 960px) {
    display: none;
  }
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.15);
  border-radius: 0 10px 10px 0;
`

const Text = styled.h1`
  position: relative;
  font-size: 2.75rem;
  margin: 0 0 2rem 3rem;
  letter-spacing: 0.03rem;
  color: #fff;
  z-index: 5;
  animation: 2s ease-out slide-right;
`

const Hr = styled.hr`
  position: relative;
  margin: 0 0 8rem 3rem;
  width: 8rem;
  height: 0.5rem;
  border: none;
  outline: 0;
  background: #fff;
  z-index: 5;
  animation: 4s ease-out slide-right;
`

const Header = styled.h2`
  display: block;
  margin-top: 5rem;
  margin-bottom: 1rem;
  font-size: 2.5rem;
  letter-spacing: 0.2rem;
  font-weight: 800;
  color: #0c1066;
  animation: 1.75s ease-in-out fade-in;
`
