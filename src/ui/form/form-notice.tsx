import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

type Props = {
  text: string
  link: string
  textLink: string
}

export const FormNotice = ({ text, link, textLink }: Props) => {
  return (
    <Notice>
      <span>{text}</span>
      <StyledLink to={link}>{textLink}</StyledLink>
    </Notice>
  )
}

const Notice = styled.div`
  margin-top: 3rem;
  animation: 1s ease-in-out slide-up;
`

const StyledLink = styled(Link)`
  margin-top: 1rem;
  text-transform: uppercase;
  text-decoration: none;
  color: #ff3a82;
`
