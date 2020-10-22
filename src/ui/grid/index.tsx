import styled from 'styled-components'

type GridStyledProps = Partial<{
  inline: 'inline-grid' | 'grid'
  gaps: string
  areas: string
  rows: string
  cols: string
  places: string
}>

type CellStyledProps = Partial<{
  place: string
  area: string
}>

const GridStyled = styled.div<GridStyledProps>`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  gap: ${({ gaps }) => gaps || 'initial'};
  grid-template-areas: ${({ areas }) => areas || 'initial'};
  grid-template-rows: ${({ rows }) => rows || 'initial'};
  grid-template-columns: ${({ cols }) => cols || 'initial'};
  place-items: ${({ places }) => places || 'initial'};
`

const CellStyled = styled.div<CellStyledProps>`
  place-self: ${({ place }) => place || 'initial'};
  grid-area: ${({ area }) => area || 'initial'};
`

export const Grid = styled(GridStyled)``

export const Cell = styled(CellStyled)``
