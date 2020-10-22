import styled from 'styled-components'

type Props = {
  align: 'start' | 'end' | 'center' | 'stretch'
  justify: 'start' | 'end' | 'center' | 'space-between' | 'space-around'
  direction: 'column' | 'reverse-column' | 'row' | 'reverse-row'
  noWrap: boolean
  inline: boolean
}

export const Row = styled.div.attrs<Partial<Props>>((props) => ({
  direction: props.direction || 'row',
  align: props.align || 'start',
  justify: props.justify || 'start',
  inline: props.inline || false,
  noWrap: props.noWrap || false,
}))<Partial<Props>>`
  display: ${({ inline }) => (inline ? 'inline-flex' : 'flex')};
  flex-wrap: ${({ noWrap }) => (noWrap ? 'nowrap' : 'wrap')};
  flex-direction: ${({ direction }) => direction};

  align-items: ${({ align }) => {
    switch (align) {
      case 'start':
        return 'flex-start'
      case 'end':
        return 'flex-end'
      case 'center':
        return 'center'
      case 'stretch':
        return 'stretch'
      default:
        return 'flex-start'
    }
  }};

  justify-content: ${({ justify }) => {
    switch (justify) {
      case 'start':
        return 'flex-start'
      case 'end':
        return 'flex-end'
      case 'center':
        return 'center'
      case 'space-between':
        return 'space-between'
      case 'space-around':
        return 'space-around'
      default:
        return 'flex-start'
    }
  }};
`
