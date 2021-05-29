import React, { ComponentProps } from 'react'
import styled from 'styled-components'

type Props = ComponentProps<'img'>

export const Avatar = ({ src, alt, width, height }: Props) => (
  <Wrapper width={width} height={height}>
    <Image src={src} alt={alt} />
  </Wrapper>
)

const Wrapper = styled.div<Pick<Props, 'width' | 'height'>>`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border-radius: 50%;
`

const Image = styled.img`
  width: 100%;
  height: 100%;
  text-align: center;
  color: transparent;
  object-fit: cover;
`
