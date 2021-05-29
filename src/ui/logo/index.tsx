import { Link } from 'react-router-dom'
import styled from 'styled-components'

import LogoIcon from '~/assets/images/logo.svg'
import { Row } from '~/ui/row'

export const Logo = () => (
  <Link to="/">
    <Row align="center" justify="center">
      <LogoIcon />
      <LogoTitle>Weatherio</LogoTitle>
    </Row>
  </Link>
)

const LogoTitle = styled.h1`
  font-size: 1.56rem;
`
