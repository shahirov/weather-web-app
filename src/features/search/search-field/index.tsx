/* eslint-disable react/jsx-props-no-spreading */
import { useCombobox } from 'downshift'
import { useStore } from 'effector-react'
import React from 'react'
import styled from 'styled-components'

import Search from '~/assets/icons/search.svg'
import {
  $suggestedCities,
  handleInputValue,
  onSelectedItemChange,
} from '~/features/search/model'

export const SearchField = () => {
  const cities = useStore($suggestedCities)

  const {
    isOpen,
    getLabelProps,
    getComboboxProps,
    getInputProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    closeMenu,
  } = useCombobox({
    items: cities,
    onSelectedItemChange,
    itemToString: (item) => (item ? item.name : ''),
    onInputValueChange: ({ inputValue }) => {
      if (!inputValue) {
        closeMenu()
      }
      handleInputValue(inputValue ?? '')
    },
  })

  const cityList = cities.map((city, index) => (
    <MenuItem
      {...getItemProps({
        key: city.id,
        item: city,
        index,
        style: {
          backgroundColor:
            highlightedIndex === index ? 'rgb(0 0 255 / 10%)' : '#fff',
        },
      })}
    >
      {city.name}
    </MenuItem>
  ))

  return (
    <CitySearchInputWrapper>
      <Label {...getLabelProps()}>Search a city</Label>
      <ComboboxWrapper {...getComboboxProps()}>
        <Input
          {...getInputProps({
            placeholder: 'Search city',
            autoComplete: 'off',
          })}
        />
        <ComboboxButton
          {...getToggleButtonProps({
            'aria-label': 'toggle menu',
            type: 'button',
          })}
        >
          <SearchIcon />
        </ComboboxButton>
      </ComboboxWrapper>
      <Menu {...getMenuProps()}>{isOpen && cityList}</Menu>
    </CitySearchInputWrapper>
  )
}

const CitySearchInputWrapper = styled.div`
  position: relative;
  width: 80%;
`

const Label = styled.label`
  position: absolute;
  clip: rect(1px, 1px, 1px, 1px);
  padding: 0;
  border: 0;
  height: 1px;
  width: 1px;
  overflow: hidden;
`

const ComboboxWrapper = styled.div`
  position: relative;
`

const Input = styled.input`
  border: none;
  padding: 1.5rem;
  width: 100%;
  font: inherit;
  color: #131f69;
  text-transform: uppercase;
  border-radius: 3rem;
  box-shadow: 0 0 2rem 0.15rem rgba(0, 0, 255, 0.1);
  outline: none;

  &::placeholder {
    color: #131f69;
  }
`

const Menu = styled.ul`
  position: absolute;
  width: 100%;
  padding: 0;
  border-radius: 1rem;
  background: #fff;
  overflow-y: auto;
  list-style: none;
  box-shadow: 0 0 2rem rgba(0, 0, 255, 0.3);
  animation: slide-down 0.1s;
  z-index: 1;
`

const MenuItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 1rem;
  color: #000;
  cursor: pointer;

  &:last-child {
    border: none;
  }
`

const ComboboxButton = styled.button`
  position: absolute;
  top: -0.25rem;
  right: 0;
  border: none;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  background: #31feae;
  box-shadow: 0 0 2rem 0.15rem rgba(0, 0, 255, 0.1);
  z-index: 5;
  outline: none;
  cursor: pointer;
`

const SearchIcon = styled(Search)`
  width: 50%;
  height: 50%;
`
