import styled from 'styled-components'

export type GridProps = Partial<{
  inline: 'inline-grid' | 'grid'
  gaps: string
  areas: string
  rows: string
  cols: string
  places: string
}>

export type CellProps = Partial<{
  place: string
  area: string
}>

export const Grid = styled.div<GridProps>`
  display: ${({ inline }) => (inline ? 'inline-grid' : 'grid')};
  gap: ${({ gaps }) => gaps || 'initial'};
  grid-template-areas: ${({ areas }) => areas || 'initial'};
  grid-template-rows: ${({ rows }) => rows || 'initial'};
  grid-template-columns: ${({ cols }) => cols || 'initial'};
  place-items: ${({ places }) => places || 'initial'};
`

export const Cell = styled.div<CellProps>`
  place-self: ${({ place }) => place || 'initial'};
  grid-area: ${({ area }) => area || 'initial'};
`
